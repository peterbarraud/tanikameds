<?php
require_once('objectbase.php');
require_once('vendorproductpricecollection.php');
require_once('vendorproductprice.php');
require_once('logger.php');
class product extends objectbase {
    // now for products we have lots of related info
    // however, we don't want to get this information (details) by default. meaning, we only want to get this info details on request
    // like so:
    // a product has a manufacturer, we don't save this info in the product table we only reference the manufacturer table
    // when we are getting the collection of products we are not going to get related details
    // we will only get this info on request
    // most likely when we're gettting the product details for a single product
    public function SetProductDetails($vendorid) {
        require_once('objectlayer/manufacturer.php');
        $manufacturer = new manufacturer($this->manufacturerid);
        $this->manufacturername = $manufacturer->name;
        require_once('objectlayer/producttype.php');
        $producttype = new producttype($this->typeid);
        $this->producttypename = $producttype->name;
        require_once('objectlayer/ailment.php');
        $ailment = new ailment($this->ailmentid);
        $this->ailmentname = $ailment->name;
        require_once('objectlayer/category.php');
        $category = new category($this->categoryid);
        $this->categoryname = $category->name;
        require_once('objectlayer/drugtype.php');
        $drugtype = new drugtype($this->drugtypeid);
        $this->drugtypename = $drugtype->name;

        $this->constituentnames = array();
        if ($this->constituentids){
            $constituentids = explode('|', $this->constituentids);
            require_once('objectlayer/constituent.php');
            foreach ($constituentids as $constituentid){
                $constituent = new constituent($constituentid);
                array_push($this->constituentnames,$constituent->name);
            }
        }

        $this->subconstituentnames = array();
        if ($this->subconstituentids){
            $subconstituentids = explode('|', $this->subconstituentids);
            require_once('objectlayer/subconstituent.php');
            foreach ($subconstituentids as $subconstituentid){
                $subconstituent = new subconstituent($subconstituentid);
                array_push($this->subconstituentnames,$subconstituent->name);
            }
        }
        $this->productprice = product::getproductprice($this->id, $vendorid);
        $this->vendorid = $vendorid;

    }
    public function Save(){
        $dataLayer = DataLayer::Instance();
        $product = new product($this->id);
        $product->name = $this->name;
        $product->description = $this->description;
        $product->keyword = $this->keyword;
        $product->manufacturerid = product::get_object_id('manufacturer', $this->manufacturername, $dataLayer);
        $product->typeid = product::get_object_id('producttype', $this->producttypename, $dataLayer);
        $product->ailmentid = product::get_object_id('ailment', $this->ailmentname, $dataLayer);
        $product->categoryid = product::get_object_id('category', $this->categoryname, $dataLayer);
        $product->drugtypeid = product::get_object_id('drugtype', $this->drugtypename, $dataLayer);
        $constituentids = array();
        $subconstituentids = array();
        foreach ($this->constituentnames as $constituentname){
            $constituentid = product::get_object_id('constituent', $constituentname, $dataLayer);
            array_push($constituentids, $constituentid);
        }
        sort($constituentids);
        $product->constituentids = join('|', $constituentids);
        
        foreach ($this->subconstituentnames as $subconstituentname){
            $subconstituentid = product::get_object_id('subconstituent', $subconstituentname, $dataLayer);
            array_push($subconstituentids, $subconstituentid);
        }
        sort($subconstituentids);  
        $product->subconstituentids = join('|', $subconstituentids);
        $dataLayer->Save($product, TRUE);
        // after saving the product now we save the product price by vendor
        $this->id = $product->id;
        $this->SaveVendorProductPrice();
        
    }
    private static function getproductprice($productid, $vendorid){
        $price = null;
        $filter = array("vendorid" => $vendorid, "productid" => $productid);
        $vendorproductpricecollection = new vendorproductpricecollection($filter);
        if (sizeof($vendorproductpricecollection->items)) {
            $price = $vendorproductpricecollection->items[0]->price;
        }
        return $price;
    }
    function SaveVendorProductPrice() {
        $logger = new logger();
        $logger->println($this);
        $vendorproductpricecollection = new vendorproductpricecollection(array("vendorid" => $this->vendorid, "productid" => $this->id));
		if (sizeof($vendorproductpricecollection->items)){
            $logger->println('here');
            $vendorproductpricecollection->items[0]->price = $this->productprice;
            $logger->printinc();
			$vendorproductpricecollection->items[0]->Save();
		} else {
            $logger->println('in else');
			require_once('objectlayer/vendorproductprice.php');
			$vendorproductprice = new vendorproductprice();
			$vendorproductprice->vendorid = $this->vendorid;
			$vendorproductprice->productid = $this->id;
			$vendorproductprice->price = $this->productprice;
            $logger->println($vendorproductprice);
			$vendorproductprice->Save();
            $logger->println('AND HERE');
		}
    }
    
    private static function get_object_id($classname, $objectname, $dataLayer){
        $retval = $dataLayer->GetIdByFieldName($classname, 'name', $objectname);
        if (!isset($retval)){
            // if we don't find the id, we'll create a new object
            require_once('objectlayer/' . $classname . '.php');
            $type = $classname;
            $object = new $type();          
            $object->name = $objectname;
            $object->Save();
            $retval = $dataLayer->GetIdByFieldName($classname, 'name', $object->name);
        }
        return $retval;
    }
    public function Delete(){
        $dataLayer = DataLayer::Instance();
        $dataLayer->DeleteProductParentData($this, 'productconstituent');
        $dataLayer->DeleteProductParentData($this, 'productsubconstituent');
        objectbase::Delete();
    }

    // public function SetProductDetailsByKeyword($keyword){
    //     $dataLayer = DataLayer::Instance();
    //     $dataLayer->GetProductObjectDataByKeyword($this, $keyword);
    // }
}

?>