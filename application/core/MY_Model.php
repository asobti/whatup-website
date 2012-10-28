<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
	Every model in our application extends this class,
	which in turn extends CI_Model
*/

class MY_model extends CI_Model {

	protected $endpoint = "";
	protected $error;

	public function __construct() {
		parent::__construct();		

		// get the api endpoint from config file
		$this->load->config('api');
		$this->endpoint = $this->config->item('api_endpoint');

		// load in the curl library
		$this->load->library('curl');
	}

	// a wrapper method that encapsulates the process and error checking
	// involved when making an api call
	protected function apiCall($endpoint) {		
		// make a get call to the endpoint
		$result = $this->curl->simple_get($endpoint);

		if ($this->curl->info['http_code'] === 200) {
			// HTTP STATUS 200 OK
			return json_decode($result);
		} else {
			// failed. Return an error object
			return $this->getErrorObject();
		}
	}

	// creates and returns Curl_Error object based on
	// the last curl error
	protected function getErrorObject() {
		return new Curl_Error($this->curl->error_code, $this->curl->error_string);
	}	

}


class Curl_Error {

	protected $code = 0;
	protected $string = "";

	public function __construct($code, $string) {
		$this->code = $code;
		$this->string = $string;
	}

	public function getErrorCode() {
		return $this->code;
	}

	public function getErrorString() {
		return $this->string;
	}
}

/* End of file MY_model.php */
/* Location: ./application/core/MY_model.php */
