<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Posts_model extends MY_Model {

		private $posts_endpoint;

		public function __construct() {
			parent::__construct();
			$this->posts_endpoint = $this->endpoint . "post";
		}


		public function getPosts($page = 1) {
			// create the endpoint
			$endpoint = $this->posts_endpoint . "?page=" . $page;
			return $this->apiCall($endpoint);						
		}

}

/* End of file posts_model.php */
/* Location: ./application/models/posts_model.php */
