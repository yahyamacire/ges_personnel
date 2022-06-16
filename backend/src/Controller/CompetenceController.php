<?php

namespace App\Controller;

use App\Entity\Competence;
use App\Repository\CompetenceRepository;
use App\Repository\ProjetRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Division;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;



#[Route('/api/')]
class CompetenceController extends AbstractFOSRestController
{
    #[Rest\Get('projets', name: 'api_list_projets')]
    public function list(CompetenceRepository $competenceRepository)
    {
        $list = $competenceRepository->findAll();
        return $this->handleView($this->view($list));
    }

    #[Rest\Post('competences', name: 'api_new_competence', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $description = $parameters['description'];


        $competence = new Competence();

        $competence->setNom($nom);
        $competence->setDescription($description);

        


        $em = $doctrine->getManager();

        $em->persist($competence);
        $em->flush();

        return $this->handleView($this->view($competence));
    }

    #[Rest\Get('competences/{id}', name: 'api_get_competence')]
    public function getFacture(Competence $projet)
    {
        return $this->handleView($this->view($projet));
    }

    #[Rest\Put('competences/{id}', name: 'api_edit_competence', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Competence $competence)
    {

        $parameters = json_decode($request->getContent(), true);


        $nom = $parameters['nom'];
        $description = $parameters['description'];
       
        


        $competence->setNom($nom);
        $competence->setDescription($description);

        

        $em = $doctrine->getManager();

        $em->persist($competence);
        $em->flush();

        return $this->handleView($this->view($competence));
    }

    #[Rest\Delete('competences/{id}', name: 'api_delete_competence', )]
    public function delete(Competence $competence, CompetenceRepository $competenceRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $competenceRepository->remove($competence, true);
        

        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}


