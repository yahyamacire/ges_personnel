<?php

namespace App\Controller;

use App\Repository\DivisionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Division;
use FOS\RestBundle\Controller\AbstractFOSRestController;


class DefaultController extends AbstractFOSRestController
{
    #[Route('/management/info', name: 'app_divisions')]
    public function info()
    {

        return new JsonResponse();
    }
}
