<?php

namespace App\Controller;

use App\Entity\Experience;
use App\Repository\ExperienceRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;



#[Route('/api/')]
class ExperienceController extends AbstractFOSRestController
{
    #[Rest\Get('experiences', name: 'api_list_experiences')]
    public function list(ExperienceRepository $experienceRepository)
    {
        $list = [];

        $user = $this->getUser();
        if($user != null && $user->getEmploye() != null){
            $list = $experienceRepository->findBy(['employe' => $user->getEmploye()->getId()]);
        }
        $list = $experienceRepository->findAll();
        return $this->handleView($this->view($list));
    }

    #[Rest\Post('experiences', name: 'api_new_experience', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        
        $entreprise = $parameters['entreprise'];
        $dateDebut= $parameters['dateDebut'];
        $dateFin = $parameters['dateFin'];
        $description = $parameters['description'];


        $experience = new Experience();

        $experience->setEntreprise($entreprise);
        $experience->setDescription($description);

        if($dateDebut != null) {
            $dateDebut = new DateTime($parameters['dateDebut']);
        }
        if($dateFin != null) {
            $dateFin = new DateTime($parameters['dateFin']);
        }

        $experience->setDateDebut($dateDebut);
        $experience->setDateFin($dateFin);

        $user = $this->getUser();
        if($user != null){
            $experience->setEmploye($user->getEmploye());
        }



        $em = $doctrine->getManager();

        $em->persist($experience);
        $em->flush();

        return $this->handleView($this->view($experience));
    }

    #[Rest\Get('experiences/{id}', name: 'api_get_experience')]
    public function getFacture(Experience $experience)
    {
        return $this->handleView($this->view($experience));
    }

    #[Rest\Put('experiences/{id}', name: 'api_edit_experience', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Experience $experience)
    {

        $parameters = json_decode($request->getContent(), true);


        
        $entreprise = $parameters['entreprise'];
        $dateDebut= $parameters['dateDebut'];
        $dateFin = $parameters['dateFin'];
        $description = $parameters['description'];


        $experience->setEntreprise($entreprise);
        $experience->setDescription($description);

        if($dateDebut != null) {
            $dateDebut = new DateTime($parameters['dateDebut']);
        }
        if($dateFin != null) {
            $dateFin = new DateTime($parameters['dateFin']);
        }

        $experience->setDateDebut($dateDebut);
        $experience->setDateFin($dateFin);
       
        $user = $this->getUser();
        if($user != null){
            $experience->setEmploye($user->getEmploye());
        }

        $em = $doctrine->getManager();

        $em->persist($experience);
        $em->flush();

        return $this->handleView($this->view($experience));
    }

    #[Rest\Delete('experiences/{id}', name: 'api_delete_experience', )]
    public function delete(Experience $experience, ExperienceRepository $experienceRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $experienceRepository->remove($experience, true);
        

        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}




