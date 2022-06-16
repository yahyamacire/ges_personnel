<?php

namespace App\Controller;

use App\Entity\Langue;
use App\Repository\LangueRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;



#[Route('/api/')]
class LangueController extends AbstractFOSRestController
{
    #[Rest\Get('langues', name: 'api_list_langues')]
    public function list(LangueRepository $langueRepository)
    {
        $list = $langueRepository->findAll();
        return $this->handleView($this->view($list));
    }

    #[Rest\Post('langues', name: 'api_new_langues', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
     
        

        $langue = new Langue();

        $langue->setNom($nom);
       

       


        $em = $doctrine->getManager();

        $em->persist($langue);
        $em->flush();

        return $this->handleView($this->view($langue));
    }

    #[Rest\Get('langues/{id}', name: 'api_get_langue')]
    public function getFacture(Langue $langue)
    {
        return $this->handleView($this->view($langue));
    }

    #[Rest\Put('langues/{id}', name: 'api_edit_langue', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Langue $langue)
    {

        $parameters = json_decode($request->getContent(), true);


        
        $nom = $parameters['nom'];
      


        $langue->setNom($nom);
  

       


        $em = $doctrine->getManager();

        $em->persist($langue);
        $em->flush();

        return $this->handleView($this->view($langue));
    }

    #[Rest\Delete('langues/{id}', name: 'api_delete_langue', )]
    public function delete(Langue $langue, LangueRepository $langueRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $langueRepository->remove($langue, true);
        

        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}


