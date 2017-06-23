<?php
require_once('objectbase.php');
require_once ('datalayer.php');
require_once ('orderstatuscollection.php');
class orderstatus extends objectbase {
    public function Save(){
        $dataLayer = DataLayer::Instance();
        // if this is set to default, all others should be un-defaulted
        if ($this->defaultstatus_bool){
            $orderstatuscollection = new orderstatuscollection();
            foreach($orderstatuscollection->items as $orderstatus){
                $orderstatus->defaultstatus_bool = '';
                $dataLayer->Save($orderstatus);
            }
        }
        $dataLayer->Save($this);
    }
}

?>