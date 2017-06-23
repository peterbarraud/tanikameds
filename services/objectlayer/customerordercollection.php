<?php
require_once('objectcollectionbase.php');
class customerordercollection extends objectcollectionbase {
    // we need a customized items array so we are going to decorate the customer order object with the customer name
    public function AddCustomerDetails(){
        // this is a valuable piece of code
        // here we are iterating over the items array and decorating the items in the array with the customer name property
        // since array are object references, we dont push the stuff back into the array
        require_once('customer.php');        
        foreach ($this->items as $item){
            $customer = new customer($item->customerid);
            $item->name = $customer->name . ' [' . $item->orderdate_ts . ']';
        }
    }
}

?>