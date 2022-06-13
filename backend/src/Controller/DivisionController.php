<?php

namespace App\Controller;

use App\Entity\Division;
use App\Entity\EmpService;
use App\Form\DivisionType;

use App\Repository\DivisionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;

#[Route('api/division')]
class DivisionController extends AbstractController
{
    #[Route('/divisions', name: 'app_division_findAll', methods: ['GET'])]
    public function findAll(DivisionRepository $divisionRepository): Response
    {
        return new JsonResponse(array('divisions' => $divisionRepository->findAll()));
    }

    #[Route('/add', name: 'app_division_add', methods: ['POST'])]
    public function new(Request $request, DivisionRepository $divisionRepository ,ServiceRepository $serviceRepository,ManagerRegistry $doctrine ): Response
    {
        $entityManager = $doctrine->getManager();
        $division = new Division();

        $nomd = $request->request->get('nomd');
       // $service = new Service();

       // $noms = $request->request->get('noms');
        

        $division->setnom($nomd);
       // $service->setnom($noms);
        //$services= array();
      
       // array_push($services,$service);
        //$serviceRepository->add($service, true);
        
       
        
        //$division->setService($services);


        $divisionRepository->add($division, true);
        $entityManager->persist($division);  
        $entityManager->flush();    

            return new Response('Saved new division with id ' );

        
    }   
    #[Route('/{id}', name: 'app_division_show', methods: ['GET'])]
    public function show(Division $division ,DivisionRepository $divisionRepository): Response
    {
        return new JsonResponse(array('division' => $divisionRepository->show()));
       
    }

    #[Route('/{id}/update', name: 'app_division_update', methods: ['POST'])]
    public function update(Request $request, Division $division , DivisionRepository  $divisionRepository, ManagerRegistry  $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
    
        $idDivision = $request->request->get('id');
        $nom = $request->request->get('nom');
        $division->setnom($nom);
         
        $entityManager->persist($division);  
        $entityManager->flush();    

        return new Response('Saved new division with id ' );
    }

    #[Route('/delete/{id}', name: 'app_division_delete', methods: ['POST'])]
    public function delete(Request $request, Division $division, DivisionRepository $divisionRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$division->getId(), $request->request->get('_token'))) {
            $divisionRepository->remove($division, true);
        

            return $this->Json('app_division_findAll');
    }
}