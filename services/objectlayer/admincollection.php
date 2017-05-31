<?php
require_once('appusercollection.php');
class admincollection extends appusercollection {
    public function __construct($filter=null, $sortby=null, $sortdirection=null) {
        $this->items = array();
        $dataLayer = DataLayer::Instance();
        $classname = str_replace('collection', '', get_class($this));
        $filter = array();
        $filter['userclassname'] = $classname;
        $objectIds = $dataLayer->GetObjectIds('appuser', $filter, $sortby, $sortdirection);
        require_once('appuser.php');
        foreach ($objectIds as $id){
            array_push($this->items, new appuser($id));
        }
        $this->length = sizeof($this->items);
    }
    
}

?>