<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Repository\StructureRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;



#[Route('/api/')]
class StructureController extends AbstractFOSRestController
{
    #[Rest\Get('structures', name: 'api_list_structures')]
    public function list(StructureRepository $structureRepository)
    {
        $list = $structureRepository->findAll();
        return $this->handleView($this->view($list));
    }

    #[Rest\Post('structures', name: 'api_new_structures', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $type= $parameters['type'];
        

        $structure = new Structure();

        $structure->setNom($nom);
        $structure->setType($type);

       


        $em = $doctrine->getManager();

        $em->persist($structure);
        $em->flush();

        return $this->handleView($this->view($structure));
    }

    #[Rest\Get('structures/{id}', name: 'api_get_structure')]
    public function getFacture(Structure $structure)
    {
        return $this->handleView($this->view($structure));
    }

    #[Rest\Put('structures/{id}', name: 'api_edit_structure', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Structure $structure)
    {

        $parameters = json_decode($request->getContent(), true);


        
        $nom = $parameters['nom'];
        $type= $parameters['type'];


        $structure->setNom($nom);
        $structure->setType($type);

       


        $em = $doctrine->getManager();

        $em->persist($structure);
        $em->flush();

        return $this->handleView($this->view($structure));
    }

    #[Rest\Delete('structures/{id}', name: 'api_delete_structure', )]
    public function delete(Structure $structure, StructureRepository $structureRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $structureRepository->remove($structure, true);
        

        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}


