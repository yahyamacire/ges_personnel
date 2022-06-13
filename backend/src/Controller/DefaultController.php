<?php

namespace App\Controller;

use App\Repository\DivisionRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Division;
use FOS\RestBundle\Controller\AbstractFOSRestController;


class DefaultController extends AbstractFOSRestController
{
    #[Route('/api/divisions', name: 'app_divisions')]
    public function list(DivisionRepository $divisionRepository)
    {
        $list = $divisionRepository->findAll();
        return $this->handleView($this->view($list));
    }
}
