<?php
require_once('objectcollectionbase.php');
class productcollection extends objectcollectionbase {
    // no object just a plain list of keywords
    public static function GetKeywords(){
        $dataLayer = DataLayer::Instance();
        $keywords = $dataLayer->GetKeywords();
        return $keywords;
    }    
}

?>