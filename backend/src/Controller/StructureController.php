<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Repository\EmployeRepository;
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
        $structures = $structureRepository->findAll();

        foreach ($structures as $structure){
            if($structure->getImage() != null){


                $content = '';
                while(!feof($structure->getImage())){
                    $content.= fread($structure->getImage(), 1024);
                }
                rewind($structure->getImage());

                $structure->setImage($content);
            }
        }
        return $this->handleView($this->view($structures));
    }

    #[Rest\Get('directions', name: 'api_list_directions')]
    public function directions(StructureRepository $structureRepository)
    {
        $structures = $structureRepository->findBy([
            'type' => 'Direction'
        ]);

        foreach ($structures as $structure){
            if($structure->getImage() != null){


                $content = '';
                while(!feof($structure->getImage())){
                    $content.= fread($structure->getImage(), 1024);
                }
                rewind($structure->getImage());

                $structure->setImage($content);
            }
        }
        return $this->handleView($this->view($structures));
    }

    #[Rest\Post('structures', name: 'api_new_structures', )]
    public function new(Request $request, ManagerRegistry  $doctrine, StructureRepository $structureRepository)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $type= isset($parameters['type']) ? $parameters['type'] : null;
        $image= isset($parameters['image']) ? $parameters['image'] : null;


        $structure = new Structure();

        $structure->setNom($nom);
        $structure->setType($type);
        $structure->setImage($image);


        if(isset($parameters['parent'])){
            $parent= $parameters['parent'];

            $structureParente = $structureRepository->find($parent['id']);
            $structure->setParent($structureParente);

        }
       


        $em = $doctrine->getManager();

        $em->persist($structure);
        $em->flush();

        return $this->handleView($this->view($structure));
    }

    #[Rest\Get('structures/{id}', name: 'api_get_structure')]
    public function getStructure(Structure $structure)
    {

        if($structure->getImage() != null){


            $content = '';
            while(!feof($structure->getImage())){
                $content.= fread($structure->getImage(), 1024);
            }
            rewind($structure->getImage());

            $structure->setImage($content);
        }

        $structures = $structure->getStructures();

        foreach ($structures as $sousStructures){
            if($sousStructures->getImage() != null){


                $content = '';
                while(!feof($sousStructures->getImage())){
                    $content.= fread($sousStructures->getImage(), 1024);
                }
                rewind($sousStructures->getImage());

                $sousStructures->setImage($content);
            }
        }

        $structure->setStructures($structures);

        return $this->handleView($this->view($structure));
    }


    #[Rest\Get('structures-user', name: 'api_get_structure_user')]
    public function structureUser(EmployeRepository $employeRepository)
    {

        $user = $this->getUser();

        // Recuperer employer par user

        // structure = emp->getStructure()

        if($structure->getImage() != null){


            $content = '';
            while(!feof($structure->getImage())){
                $content.= fread($structure->getImage(), 1024);
            }
            rewind($structure->getImage());

            $structure->setImage($content);
        }

        $structures = $structure->getStructures();

        foreach ($structures as $sousStructures){
            if($sousStructures->getImage() != null){


                $content = '';
                while(!feof($sousStructures->getImage())){
                    $content.= fread($sousStructures->getImage(), 1024);
                }
                rewind($sousStructures->getImage());

                $sousStructures->setImage($content);
            }
        }

        $structure->setStructures($structures);

        return $this->handleView($this->view($structure));
    }

    #[Rest\Put('structures/{id}', name: 'api_edit_structure', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Structure $structure)
    {

        $parameters = json_decode($request->getContent(), true);


        
        $nom = $parameters['nom'];
        $type= isset($parameters['type']) ? $parameters['type'] : null;
        $image= isset($parameters['image']) ? $parameters['image'] : null;


        $structure->setNom($nom);
        $structure->setType($type);
        $structure->setImage($image);

       


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


