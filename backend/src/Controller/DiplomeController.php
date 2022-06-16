<?php

namespace App\Controller;

use App\Entity\Diplome;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Repository\DiplomeRepository;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Employe;
use App\Repository\EmployeRepository;


#[Route('/api/')]
class DiplomeController extends AbstractFOSRestController
{

    #[Rest\Get('diplomes', name: 'api_list_diplomes')]
    public function list(DiplomeRepository $diplomeRepository)
    {

        $list = [];

        $user = $this->getUser();
        if($user != null && $user->getEmploye() != null){
            $list = $diplomeRepository->findBy(['employe' => $user->getEmploye()->getId()]);
        }

        return $this->handleView($this->view($list));
    }


    #[Rest\Post('diplomes', name: 'api_new_diplome', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        $libelle = $parameters['libelle'];
        $universite = $parameters['universite'];
        $date = $parameters['date'];
        $description = $parameters['description'];
        $dp = isset($parameters['diplome']) ? $parameters['diplome'] : null;


        $diplome = new Diplome();

        $diplome->setLibelle($libelle);
        $diplome->setUniversite($universite);
        $diplome->setDescription($description);

        $diplome->setDiplome($dp);
        if($date != null) {
            $date = new DateTime($parameters['date']);
        }


        $diplome->setDate($date);

        $user = $this->getUser();
        if($user != null){
            $diplome->setEmploye($user->getEmploye());
        }

        $em = $doctrine->getManager();

        $em->persist($diplome);
        $em->flush();

        return $this->handleView($this->view($diplome));
    }

    #[Rest\Get('diplomes/{id}', name: 'api_get_diplome')]
    public function getFacture(Diplome $diplome)
    {
        return $this->handleView($this->view($diplome));
    }

    #[Rest\Put('diplomes/{id}', name: 'api_edit_', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Diplome $diplome)
    {

        $parameters = json_decode($request->getContent(), true);


        $libelle = $parameters['libelle'];
        $universite = $parameters['universite'];
        $date = $parameters['date'];
        $description = $parameters['description'];
        $dp = isset($parameters['diplome']) ? $parameters['diplome'] : null;


        

        $diplome->setLibelle($libelle);
        $diplome->setUniversite($universite);
        $diplome->setDescription($description);
        $diplome->setDiplome($dp);
        if($date != null) {
            $date = new DateTime($parameters['date']);
        }


        $diplome->setDate($date);



        $em = $doctrine->getManager();

        $em->persist($diplome);
        $em->flush();

        return $this->handleView($this->view($diplome));
    }

    #[Rest\Delete('diplomes/{id}', name: 'api_delete_diplome', )]
    public function delete(Diplome $diplome, DiplomeRepository $diplomeRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $diplomeRepository->remove($diplome, true);


        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }

}
