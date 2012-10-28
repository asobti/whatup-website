<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Posts extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('posts_model');
	}
	public function index()
	{		
		$posts = $this->posts_model->getPosts();

		if (get_class($posts) === "Curl_Error") {
			echo sprintf("There was an error: Error code: %d. Error string: %s."
							, $posts->getErrorCode()
							, $posts->getErrorString() 
						);
		} else {
			echo "<pre>";
			print_r($posts);
			echo "</pre>";
		}
	}

}

/* End of file posts.php */
/* Location: ./application/controllers/posts.php */
