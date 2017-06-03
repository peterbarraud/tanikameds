<?php
require_once('appuser.php');
class userbase {
    public function __construct($id=null) {
		$appuser = new appuser($id);
        foreach ($appuser as $key => $value) {
            $this->{$key} = $value;
        }
    }

    public function Save(){
		$appuser = new appuser();
        $appuser->userclassname = get_class($this);
        foreach ($this as $key => $value) {
            $appuser->{$key} = $value;
        }
        // if this is admin then give all permissions
        if ($appuser->userclassname == 'admin'){
            $appuser->canaddproduct = 1;
            $appuser->candeleteproduct = 1;
            $appuser->canmanageuser = 1;
        } 
        $appuser->defaultroute = 'product';
        $appuser->Save();
        $this->id = $appuser->id;
    }
    
    public function Delete() {
		$appuser = new appuser($this->id);
        return $appuser->Delete();
    }
}

?>