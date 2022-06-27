<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Entity\Employe;
use App\Entity\User;
use App\Repository\EmployeRepository;
use App\Repository\UserRepository;
use App\Repository\StructureRepository;
use DateTime;
use Doctrine\ORM\Mapping\Id;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use PhpParser\Node\Stmt\Break_;

#[Route('/api/')]
class StructureController extends AbstractFOSRestController
{
    #[Rest\Get('structures', name: 'api_list_structures')]
    public function list(StructureRepository $structureRepository)
    {
        $structures = $structureRepository->findAll();

        foreach ($structures as $structure) {
            if ($structure->getImage() != null) {


                $content = '';
                while (!feof($structure->getImage())) {
                    $content .= fread($structure->getImage(), 1024);
                }
                rewind($structure->getImage());

                $structure->setImage($content);
            }
        }
        return $this->handleView($this->view($structures));
    }


    #[Rest\Post('structures', name: 'api_new_structures', )]
    public function new(Request $request, ManagerRegistry $doctrine, StructureRepository $structureRepository)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $type = isset($parameters['type']) ? $parameters['type'] : null;
        $image = isset($parameters['image']) ? $parameters['image'] : null;


        $structure = new Structure();

        $structure->setNom($nom);
        $structure->setType($type);
        $structure->setImage($image);


        if (isset($parameters['parent'])) {
            $parent = $parameters['parent'];

            $structureParente = $structureRepository->find($parent['id']);
            $structure->setParent($structureParente);

        }


        $em = $doctrine->getManager();

        $em->persist($structure);
        $em->flush();

        return $this->handleView($this->view($structure));
    }


    #[Rest\Get('structures/directions', name: 'api_list_directions')]
    public function directions(StructureRepository $structureRepository)
    {
        $structures = $structureRepository->findBy([
            'type' => 'Direction'
        ]);

        foreach ($structures as $structure) {

            if ($structure->getImage() != null) {


                $content = '';
                while (!feof($structure->getImage())) {
                    $content .= fread($structure->getImage(), 1024);
                }
                rewind($structure->getImage());

                $structure->setImage($content);
            }
        }
        return $this->handleView($this->view($structures));
    }


    #[Rest\Get('structures/structureSG', name: 'api_get_structure_sg')]
    public function structureSG(StructureRepository $structureRepository, EmployeRepository $employeRepository)
    {

        $structure = $structureRepository->findOneBy([
            'type' => 'Secretariat_Generale'
        ]);


        $structures = $structure->getStructures();


        foreach ($structures as $sousStructures) {
            if ($sousStructures->getImage() != null) {


                $content = '';
                while (!feof($sousStructures->getImage())) {
                    $content .= fread($sousStructures->getImage(), 1024);
                }
                rewind($sousStructures->getImage());

                $sousStructures->setImage($content);
            }
        }

        $structure->setStructures($structures);


        $employe = null;

        $employe = $employeRepository->findOneBy([
            'structure' => $structure->getId(),
            'fonction' => 'SG'
        ]);
        if ($employe != null) {
            $chef = $employe->getNom() . ' ' . $employe->getPrenom();
            $structure->setChef($chef);
            $structure->setIdChef($employe->getId());

        }

        return $this->handleView($this->view($structure));
    }


    #[Rest\Get('structures/{id}', name: 'api_get_structure')]
    public function getStructure(Structure $structure, EmployeRepository $employeRepository)
    {

        if ($structure->getImage() != null) {


            $content = '';
            while (!feof($structure->getImage())) {
                $content .= fread($structure->getImage(), 1024);
            }
            rewind($structure->getImage());

            $structure->setImage($content);
        }

        $structures = $structure->getStructures();


        foreach ($structures as $sousStructures) {
            if ($sousStructures->getImage() != null) {


                $content = '';
                while (!feof($sousStructures->getImage())) {
                    $content .= fread($sousStructures->getImage(), 1024);
                }
                rewind($sousStructures->getImage());

                $sousStructures->setImage($content);
            }
        }

        $structure->setStructures($structures);


        $employe = null;
        switch ($structure->getType()) {
            case 'Direction':
                $employe = $employeRepository->findOneBy([
                    'structure' => $structure->getId(),
                    'fonction' => 'DIRECTEUR'
                ]);
                Break;
            case 'Secretariat_Generale':
                $employe = $employeRepository->findOneBy([
                    'structure' => $structure->getId(),
                    'fonction' => 'SG'
                ]);
                Break;
            case 'Service':
                $employe = $employeRepository->findOneBy([
                    'structure' => $structure->getId(),
                    'fonction' => 'CHEF_SERVICE'
                ]);
                Break;
            case 'Division':
                $employe = $employeRepository->findOneBy([
                    'structure' => $structure->getId(),
                    'fonction' => 'CHEF_DIVISION'
                ]);

        }

        if ($employe != null) {
            $chef = $employe->getNom() . ' ' . $employe->getPrenom();
            $structure->setChef($chef);
            $structure->setIdChef($employe->getId());
        }

        return $this->handleView($this->view($structure));

    }


    #[Rest\Get('structureUser', name: 'api_get_structure_user')]
    public function structureUser(EmployeRepository $employeRepository)
    {

        $user = $this->getUser();
        $employe = $user->getEmploye();

        $structure = null;

        if($employe != null){
            $structure = $employe->getStructure();

            if($structure != null){


                $employeChef = null;
                switch ($structure->getType()) {
                    case 'Direction':
                        $employeChef = $employeRepository->findOneBy([
                            'structure' => $structure->getId(),
                            'fonction' => 'DIRECTEUR'
                        ]);
                        Break;
                    case 'Secretariat_Generale':
                        $employeChef = $employeRepository->findOneBy([
                            'structure' => $structure->getId(),
                            'fonction' => 'SG'
                        ]);
                        Break;
                    case 'Service':
                        $employeChef = $employeRepository->findOneBy([
                            'structure' => $structure->getId(),
                            'fonction' => 'CHEF_SERVICE'
                        ]);
                        Break;
                    case 'Division':
                        $employeChef = $employeRepository->findOneBy([
                            'structure' => $structure->getId(),
                            'fonction' => 'CHEF_DIVISION'
                        ]);

                }

                if ($employeChef != null) {

                    if($employeChef->getId() != $employe->getId()){
                        return $this->handleView($this->view(null));
                    }

                    $chef = $employeChef->getNom() . ' ' . $employeChef->getPrenom();
                    $structure->setChef($chef);
                    $structure->setIdChef($employe->getId());

                }else{
                    return $this->handleView($this->view(null));
                }

                if ($structure->getImage() != null) {


                    $content = '';
                    while (!feof($structure->getImage())) {
                        $content .= fread($structure->getImage(), 1024);
                    }
                    rewind($structure->getImage());

                    $structure->setImage($content);
                }



                $structures = $structure->getStructures();

                foreach ($structures as $sousStructures) {
                    if ($sousStructures->getImage() != null) {


                        $content = '';
                        while (!feof($sousStructures->getImage())) {
                            $content .= fread($sousStructures->getImage(), 1024);
                        }
                        rewind($sousStructures->getImage());

                        $sousStructures->setImage($content);
                    }
                }

                $structure->setStructures($structures);
            }
        }



        return $this->handleView($this->view($structure));
    }


    #[Rest\Put('structures/{id}', name: 'api_edit_structure', )]
    public function edit(Request $request, ManagerRegistry $doctrine, Structure $structure)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $type = isset($parameters['type']) ? $parameters['type'] : null;
        $image = isset($parameters['image']) ? $parameters['image'] : null;


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


