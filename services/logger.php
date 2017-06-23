<?php
// TODO: Need to create another applicaiton logger
// TODO: Make THAT a singleton
// TODO: We should use fopen and NOT file_put_contents
// TODO: The fclose should happen on the destructor 
class Logger {
    public function __construct($filename=null, $lineseparator=null) {
        $this->logfilename = $filename;
        if ($this->logfilename == null){
            $debug_backtrace = debug_backtrace();
            $first_entry = $debug_backtrace[1];
            $function_name = $first_entry['function'];
            $this->logfilename = 'logs/' . $function_name . '.log';
        }
        $this->linenumber = 0;
        $this->lastlineprinted = '';
        $this->sepchar = $lineseparator;
        if ($lineseparator == null){
            $this->sepchar = 'x';
        }
    }
    public function println($blocktoprint){
        $this->print("$blocktoprint\n");
    }
    public function print($blocktoprint){
        file_put_contents($this->logfilename,"$blocktoprint", FILE_APPEND);
    }
    public function printobject($type){
        if (gettype($type) == "boolean" || gettype($type) == 'integer' || gettype($type) == 'double' || gettype($type) == 'string'){
            file_put_contents($this->logfilename,"$type", FILE_APPEND);
        } else if (gettype($type) == "array" || gettype($type) == 'object' || gettype($type) == 'resource'){
            ob_start();
            var_dump($type);
            file_put_contents($this->logfilename,ob_get_clean(), FILE_APPEND);
        } else if (gettype($type) == "NULL"){
            file_put_contents($this->logfilename,'NULL', FILE_APPEND);
        } else {
            file_put_contents($this->logfilename,'Unknown Object type passed to logger', FILE_APPEND);
        }
        
    }
    public function printinc(){
        $this->println($this->linenumber);
        $this->linenumber += 1;
    }
    public function printsep(){
        $this->println(str_repeat("$this->sepchar", strlen($this->lastlineprinted)));
    }
}

?>