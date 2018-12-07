<?php
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Cloudinary.php';
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Uploader.php';
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Helpers.php';
require '/var/www/html/code1/codeigniter/application/cloud/vendor/cloudinary/cloudinary_php/src/Api.php';
require '/var/www/html/code1/codeigniter/application/cloud/settings.php';
class In{
    public function a()
    {
        $return        = \Cloudinary\Uploader::upload("/var/www/html/code1/codeigniter/uploads/a.jpg");
        /**
         * @var imageUrl the cloudinary url 
         */
        echo $return['url'];
    }
}
$r = new In();
$r->a();