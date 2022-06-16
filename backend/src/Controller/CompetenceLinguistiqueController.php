<?php

namespace App\Controller;

use App\Entity\CompetenceLinguistique;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CompetenceLinguistiqueRepository;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api/')]
class CompetenceLinguistiqueController extends AbstractFOSRestController
{
    #[Rest\Get('competence-linguistiques', name: 'api_list_CompetenceLinguistiques')]
    public function list(CompetenceLinguistiqueRepository $CompentenceLinguistiqueRepository)
    {
        $list = $CompentenceLinguistiqueRepository->findAll();
        return $this->handleView($this->view($list));
    }
    #[Rest\Post('competence-linguistiques', name: 'api_new_CompetenceLinguistique', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);


        $niveau = $parameters['niveau'];
       
        $CompetenceLinguistique = new CompetenceLinguistique();

        $CompetenceLinguistique->setniveau($niveau);
        $em = $doctrine->getManager();

        $em->persist($CompetenceLinguistique);
        $em->flush();

        return $this->handleView($this->view($CompetenceLinguistique));
    }

    #[Rest\Get('CompetenceLinguistiques/{id}', name: 'api_get_CompetenceLinguistique')]
    public function getFacture(CompetenceLinguistique $CompetenceLinguistique){
        return $this->handleView($this->view($CompetenceLinguistique));
    }
    #[Rest\Put('projets/{id}', name: 'api_edit_project', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, CompetenceLinguistique $CompetenceLinguistique)
    {

        $parameters = json_decode($request->getContent(), true);
        $niveau = $parameters['niveau'];
        $niveau->setDateDebut($niveau);
        $em = $doctrine->getManager();

        $em->persist($CompetenceLinguistique);
        $em->flush();

        return $this->handleView($this->view($CompetenceLinguistique));
    }

    #[Rest\Delete('CompetenceLinguistiques/{id}', name: 'api_delete_CompetenceLinguistique', )]
    public function delete(CompetenceLinguistique $CompetenceLinguistique, CompetenceLinguistiqueRepository $CompetenceLinguistiqueRepository): Response
    {
      
        $CompetenceLinguistiqueRepository->remove($CompetenceLinguistique, true);
        

        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }

}