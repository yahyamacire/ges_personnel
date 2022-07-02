<?php

namespace App\Controller;

use App\Entity\Projet;
use App\Repository\ProjetRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;




#[Route('/api/')]
class ProjetController extends AbstractFOSRestController
{
    #[Rest\Get('projets', name: 'api_list_projets')]
    public function list(ProjetRepository $projetRepository)
    {
        $list = [];

        $user = $this->getUser();
        if($user != null && $user->getEmploye() != null){
            $list = $projetRepository->findBy(['employe' => $user->getEmploye()->getId()]);
        }

        return $this->handleView($this->view($list));
    }

    #[Rest\Post('projets', name: 'api_new_project', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $dateDebut= $parameters['dateDebut'];
        $dateFin = $parameters['dateFin'];
        $description = $parameters['description'];


        $projet = new Projet();

        $projet->setNom($nom);
        $projet->setDescription($description);

        if($dateDebut != null) {
            $dateDebut = new DateTime($parameters['dateDebut']);
        }
        if($dateFin != null) {
            $dateFin = new DateTime($parameters['dateFin']);
        }

        $projet->setDateDebut($dateDebut);
        $projet->setDateFin($dateFin);


        $em = $doctrine->getManager();

        $em->persist($projet);
        $em->flush();

        return $this->handleView($this->view($projet));
    }

    #[Rest\Get('projets/{id}', name: 'api_get_projet')]
    public function getFacture(Projet $projet)
    {
        return $this->handleView($this->view($projet));
    }

    #[Rest\Put('projets/{id}', name: 'api_edit_project', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Projet $projet)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $dateDebut= $parameters['dateDebut'];
        $dateFin = $parameters['dateFin'];
        $description = $parameters['description'];


        $projet->setNom($nom);
        $projet->setDescription($description);

        if($dateDebut != null) {
            $dateDebut = new DateTime($parameters['dateDebut']);
        }
        if($dateFin != null) {
            $dateFin = new DateTime($parameters['dateFin']);
        }

        $projet->setDateDebut($dateDebut);
        $projet->setDateFin($dateFin);


        $em = $doctrine->getManager();

        $em->persist($projet);
        $em->flush();

        return $this->handleView($this->view($projet));
    }

    #[Rest\Delete('projets/{id}', name: 'api_delete_project', )]
    public function delete(Projet $projet, ProjetRepository $projetRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $projetRepository->remove($projet, true);


        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}


