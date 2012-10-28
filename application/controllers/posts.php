<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Posts extends MY_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('posts_model');
	}
	
	public function get($page = 1)
	{
		$posts = $this->posts_model->getPosts($page);

		if (get_class($posts) === "Curl_Error") {
			$error = new stdClass();
			$error->error_code = $posts->getErrorCode();
			$error->error_string = $posts->getErrorString();

			echo "<pre>";
			print_r(json_encode($error));
			echo "</pre>";
		} else {
			echo "<pre>";
			print_r(json_encode($posts));
			echo "</pre>";
		}
	}

}

/* End of file posts.php */
/* Location: ./application/controllers/posts.php */
