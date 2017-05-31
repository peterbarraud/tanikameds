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
        foreach ($this as $key => $value) {
            $appuser->{$key} = $value;
        }
        $appuser->userclassname = get_class($this);
        $appuser->Save();
        $this->id = $appuser->id;
    }
    
    public function Delete() {
		$appuser = new appuser($this->id);
        return $appuser->Delete();
    }
}

?>