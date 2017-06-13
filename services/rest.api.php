<?php
  //VERY IMPORTANT
  //these services will NEVER error out.
  //at the service we will stop any errors and send back a good json but packaged with error information
	require 'Slim/Slim.php';
	$app = new Slim();
	//a single rest API is self-sufficient - so how about the db connection is made at the API level
	//this connection object - held inside a global variable or something of that sort is then available to every method, object that is invokved from the API
	//this ensures that a single connection is opened for the entire duration of the API but no more
	//we can then also (brilliant, this one) make full use of db transactions - we can do a full commit / rollback of everything that happened for the duration of the API


	// create a test rest to try out stuff before we push it through
	$app->get('/justtotest/', 'justtotest');
	function justtotest() {
		$string = file_get_contents("datainfo.json");
		$json_a = json_decode($string, true);
		echo $json_a['server'];
		echo $json_a['database'];		
	}
	
	$app->get('/validateuser/:username/:password/', 'getappuser');
	function getappuser($username, $password) {
		$retval = validate_user($username, $password);
		allow_cross_domain_calls();
		echo json_encode($retval);
	}
	
	$app->get('/getobjectbyid/:classname/:id/', 'getobjectbyid');
	function getobjectbyid($classname,$id) {
		require_once('objectlayer/' . $classname . '.php');
		$type = $classname;
		$object = new $type($id);
		allow_cross_domain_calls();
		echo json_encode($object);
	}

	$app->get('/getnewobjectbyclassname/:classname/', 'getnewobjectbyclassname');
	function getnewobjectbyclassname($classname) {
		require_once('objectlayer/' . $classname . '.php');
		$type = $classname;
		$object = new $type();
		allow_cross_domain_calls();
		echo json_encode($object);
	}

	$app->get('/getnewproductdetails/:vendorid/', 'getnewproductdetails');
	function getnewproductdetails($vendorid) {
		require_once('objectlayer/product.php');
		$product = new product();
		$product->SetProductDetails($vendorid);
		allow_cross_domain_calls();
		echo json_encode($product);
	}

	$app->get('/getproductdetails/:productid/:vendorid/', 'getproductdetails');
	function getproductdetails($productid, $vendorid) {
		require_once('objectlayer/product.php');
		$product = new product($productid);
		$product->SetProductDetails($vendorid);
		allow_cross_domain_calls();
		echo json_encode($product);
	}

	$app->get('/getproductdetailsbykeyword/:keyword/', 'getproductdetailsbykeyword');
	function getproductdetailsbykeyword($keyword) {
		$retval = array();
		require_once('objectlayer/productcollection.php');
		$filter = array();
		$filter['keyword'] = $keyword;
		$productcollection = new productcollection($filter);
		$product = $productcollection->items[0];
		$retval['related_products'] = array();
		if ($product->constituentids){	// get related products
			$filter = array();
			$filter['constituentids'] = $product->constituentids;
			$related_products_collection = new productcollection($filter);
			foreach ($related_products_collection->items as $related_product){
				if ($related_product->id != $product->id){
					array_push($retval['related_products'], $related_product);
				}
			}
		}
		$vendorid = 1;
		$product->SetProductDetails($vendorid);
		$retval['product'] = $product;
		allow_cross_domain_calls();
		echo json_encode($retval);
	}


	$app->get('/getobjectsbyclassname/:classname/', 'getobjectsbyclassname');
	function getobjectsbyclassname($classname) {
		require_once('objectlayer/' . $classname . 'collection.php');
		$type = $classname . 'collection';
		$objectcollection = new $type();
		allow_cross_domain_calls();
		echo json_encode($objectcollection);
	}

	$app->get('/getsortedobjectsbyclassname/:classname/:sortby/:sortdirection/', 'getsortedobjectsbyclassname');
	function getsortedobjectsbyclassname($classname, $soryby, $sortdirection) {
		require_once('objectlayer/' . $classname . 'collection.php');
		$type = $classname . 'collection';
		$objectcollection = new $type(null, $soryby, $sortdirection);
		allow_cross_domain_calls();
		echo json_encode($objectcollection);
	}

	$app->post('/saveobject/:classname/', 'saveobject');
	function saveobject($classname){
		$app = new Slim();
		require_once('objectlayer/' . $classname . '.php');
		$jsonobject = json_decode($app->request()->getBody());
		require_once('logger.php');
		$logger = new Logger();
		$logger->printobject($jsonobject);
		$object = GetObjectForJSON($jsonobject,$classname);
		$object->Save();
		$retval = array();
		$retval['saveobject'] = $object;
		require_once('objectlayer/' . $classname . 'collection.php');
		$type = $classname . 'collection';
		$objectcollection = new $type();
		$retval['objectcollection'] = $objectcollection;
		allow_cross_domain_calls();
		echo json_encode($retval);
	}

	$app->post('/saveproducts/:username/:password/', 'saveproducts');
	function saveproducts($username, $password){
		$validated_user_info = validate_user($username, $password);
		$retval = array();
		if ($validated_user_info['invaliduser'] == 0){
			require_once('objectlayer/product.php');
			require_once('objectlayer/productcollection.php');
			$added_prods = array();
			$deleted_prods_no_perm = array();
			$deleted_prods = array();
			$price_update_prods = array();
			$err_products = array();
			$app = new Slim();
			require_once('logger.php');
			$logger = new Logger();
			$products_json = json_decode($app->request()->getBody());
			foreach($products_json as $product_json) {
				try {
					$product = GetObjectForJSON($product_json, 'product');
					$logger->printobject($product);
					// check if this is a DELETE row
					if (strtoupper(substr($product->productdelete,0,1)) == "Y"){
						// but also check if this user has permissions to delete
						if ($validated_user_info['user']->candeleteproduct){
							$productstodelete = new productcollection(array("name"=>$product->name));
							if ($productstodelete->length == 1){
								$productstodelete->items[0]->Delete();
								array_push($deleted_prods, $productstodelete->items[0]->name);
							}
						} else {
							array_push($deleted_prods_no_perm, $product->name);
						}
					}
					// else we'll insert or update
					else {
						// but only if this user can update
						if ($validated_user_info['user']->canaddproduct){
							$product->id = null;
							$product->description = null;
							$product->vendorid = $validated_user_info['user']->id;
							$product->Save();
							array_push($added_prods, $product->name);
						}
					}
					if (!$validated_user_info['user']->canaddproduct && !$validated_user_info['user']->candeleteproduct){
						$productsforpriceupdate = new productcollection(array("name"=>$product->name));
						if ($productsforpriceupdate->length == 1){
							$updatepriceproduct = $productsforpriceupdate->items[0];
							$updatepriceproduct->vendorid = $validated_user_info['user']->id;
							$updatepriceproduct->productprice = $product->productprice;
							$updatepriceproduct->SaveVendorProductPrice();
							array_push($price_update_prods,$updatepriceproduct->name);
						}
					}
				}
				catch (Exception $e) {
					array_push($err_products, $product->name);
				}
			}
			$retval['added-products'] = $added_prods;
			$retval['deleted-products'] = $deleted_prods;
			$retval['price-update-products'] = $price_update_prods;
			$retval['deleted-prods-no-perm'] = $deleted_prods_no_perm;
			$retval['err-products'] = $err_products;
			$retval['invaliduser'] = 0;
		}
		else {
			$retval['invaliduser'] = 1;
		}
		echo json_encode($retval);
	}
	
	$app->post('/placeorder/', 'placeorder');
	function placeorder(){
		$app = new Slim();
		$order_json = json_decode($app->request()->getBody());
		require_once('logger.php');
		$logger = new Logger();
		require_once('objectlayer/customer.php');
		$customer = GetObjectForJSON($order_json->customer, 'customer');
		$logger->printobject($customer);
		$customer->Save();
		$logger->printobject($customer);
		$customerid = $customer->id;
		allow_cross_domain_calls();
		echo json_encode($order_json);
	}
	
	
	$app->get('/deleteobjectbyid/:classname/:id/', 'deleteobject');
	function deleteobject($classname,$id) {
		require_once('objectlayer/' . $classname . '.php');
		$type = $classname;
		$object = new $type($id);
		$affected_rows = $object->Delete();
		$retval = array();
		if ($affected_rows == -1){
			$retval['hasassociatedproducts'] = 1;
		}
		else {
			$retval['hasassociatedproducts'] = 0;
			require_once('objectlayer/' . $classname . 'collection.php');
			$type = $classname . 'collection';
			$objectcollection = new $type();
			$retval['updatedcollection'] = $objectcollection;
		}
		allow_cross_domain_calls();
		echo json_encode($retval);
	}

	$app->get('/deleteuserbyid/:id/', 'deleteuserbyid');
	function deleteuserbyid($id) {
		$retval = array();
		require_once('objectlayer/appusercollection.php');
		$appusercollection = new appusercollection();
		if ($appusercollection->length == 1){
			$retval['lastuser'] = 1;
		}
		else {
			$retval['lastuser'] = 0;
			require_once('objectlayer/admin.php');
			$user = new admin($id);
			$user->Delete();
			$retval['updatedcollection'] = $appusercollection;
		}
		allow_cross_domain_calls();
		echo json_encode($retval);
	}

	$app->get('/getproductitemsnamelist/', 'getproductitemsnamelist');
	function getproductitemsnamelist() {
		$retval = array();
		$itemnames = array('ailment', 'category', 'producttype', 'drugtype', 'manufacturer', 'constituent', 'subconstituent');
		foreach ($itemnames as $itemname){
			$retval[$itemname] = getnameslist($itemname);
		}
		allow_cross_domain_calls();
		echo json_encode($retval);
	}


	$app->get('/getkeywords/', 'getkeywords');
	function getkeywords() {
		require_once('objectlayer/productcollection.php');
		$keywords = productcollection::GetKeywords();
		allow_cross_domain_calls();
		echo json_encode($keywords);
	}

	$app->get('/getusernames/', 'getusernames');
	function getusernames() {
		require_once('objectlayer/appusercollection.php');
		$appusercollection = new appusercollection();
		$usernames = array();
		foreach ($appusercollection->items as $appuser){
			array_push($usernames, $appuser->username);
		}
		allow_cross_domain_calls();
		echo json_encode($usernames);
	}

	$app->run();


function getnameslist($classname){
	require_once('objectlayer/' . $classname . 'collection.php');
	$type = $classname . 'collection';
	$retval = array();
	$type = $classname . 'collection';
	$objectcollection = new $type(null, 'name', 'asc');
	return $objectcollection->getnamescollection();
}

// probably move these to a common.php
function GetObjectForJSON($jsonobject,$className) {
	//TODO: where is the credit for the following code line
	return unserialize(sprintf('O:%d:"%s"%s',strlen($className),$className,strstr(strstr(serialize($jsonobject), '"'), ':')));
}

function allow_cross_domain_calls() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    //echo "You have CORS!";
}
function validate_user($username, $password){
	require_once('objectlayer/appusercollection.php');
	$filter = array();
	$filter['username'] = $username;
	$filter['password'] = $password;
	$appusers = new appusercollection($filter);
	$retval = array();
	// since the appuser table has a unique constraint on the username field, we'll get one or no app user
	if ($appusers->length == 1){
		$retval['user'] = $appusers->items[0];
		$retval['invaliduser'] = 0;
	}
	else {
		$retval['invaliduser'] = 1;
	}
	return $retval;
}
?>
