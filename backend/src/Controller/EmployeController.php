<?php

namespace App\Controller;

use App\Entity\Projet;
use App\Repository\EmployeRepository;
use App\Repository\ProjetRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Division;
use App\Entity\Employe;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;



#[Route('/api/')]
class EmployeController extends AbstractFOSRestController
{
    #[Rest\Get('employes', name: 'api_list_employes')]
    public function list(EmployeRepository $employeRepository)
    {
        $list = $employeRepository->findAll();
        return $this->handleView($this->view($list));
    }

    #[Rest\Post('employes', name: 'api_new_employe', )]
    public function new(Request $request, ManagerRegistry  $doctrine)
    {

        $parameters = json_decode($request->getContent(), true);

        $nni = $parameters['nni'];
        $nom = $parameters['nom'];
        $prenom = $parameters['prenom'];
        $sexe = $parameters['sexe'];
        $dateNaissance= $parameters['dateNaissance'];
        $email = $parameters['email'];
        $telephone = $parameters['telephone'];
        $dateRecrutement = $parameters['dateRecrutement'];
        $fonction = $parameters['fonction'];
        $status = isset($parameters['status']) ? $parameters['status'] : null ;
        $domaine = isset($parameters['domaine']) ? $parameters['domaine'] : null ;
        $photo = isset($parameters['photo']) ? $parameters['photo'] : null ;
        $adresse = isset($parameters['adresse']) ? $parameters['adresse'] : null ;
        $matricule = isset($parameters['matricule']) ? $parameters['matricule'] : null ;


        $employe = new Employe();
        $employe->setNni($nni);
        $employe->setNom($nom);
        $employe->setPrenom($prenom);
        $employe->setSexe($sexe);
        $employe->setEmail($email);
        $employe->setTelephone($telephone);
        $employe->setAdresse($adresse);
        $employe->setStatus($status);
        $employe->setMatricule($matricule);
        $employe->setFonction($fonction);
        $employe->setDomaine($domaine);
        $employe->setPhoto($photo);


        if($dateNaissance != null) {
            $dateNaissance = new DateTime($parameters['dateNaissance']);
        }
        if($dateRecrutement != null) {
            $dateRecrutement = new DateTime($parameters['dateRecrutement']);
        }

        $employe->setDateNaissance($dateNaissance);
        $employe->setDateRecrutement($dateRecrutement);


        $user = $this->getUser();

        $employe->setCompte($user);


        $em = $doctrine->getManager();

        $em->persist($employe);
        $em->flush();

        return $this->handleView($this->view($employe));
    }

    #[Rest\Get('employes/{id}', name: 'api_get_employe')]
    public function getFacture(Employe $employe)
    {
        return $this->handleView($this->view($employe));
    }

    #[Rest\Put('employes/{id}', name: 'api_edit_employe', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Employe $employe)
    {

        $parameters = json_decode($request->getContent(), true);


        $nni = $parameters['nni'];
        $nom = $parameters['nom'];
        $prenom = $parameters['prenom'];
        $sexe = $parameters['sexe'];
        $dateNaissance= $parameters['dateNaissance'];
        $email = $parameters['email'];
        $telephone = $parameters['telephone'];
        $dateRecrutement = $parameters['dateRecrutement'];
        $fonction = $parameters['fonction'];
        $status = isset($parameters['status']) ? $parameters['status'] : null ;
        $domaine = isset($parameters['domaine']) ? $parameters['domaine'] : null ;
        $photo = isset($parameters['photo']) ? $parameters['photo'] : null ;
        $adresse = isset($parameters['adresse']) ? $parameters['adresse'] : null ;
        $matricule = isset($parameters['matricule']) ? $parameters['matricule'] : null ;


        $employe->setNni($nni);
        $employe->setNom($nom);
        $employe->setPrenom($prenom);
        $employe->setSexe($sexe);
        $employe->setEmail($email);
        $employe->setTelephone($telephone);
        $employe->setAdresse($adresse);
        $employe->setStatus($status);
        $employe->setMatricule($matricule);
        $employe->setFonction($fonction);
        $employe->setDomaine($domaine);
        $employe->setPhoto($photo);

        if($dateNaissance != null) {
            $dateNaissance = new DateTime($parameters['dateNaissance']);
        }
        if($dateRecrutement != null) {
            $dateRecrutement = new DateTime($parameters['dateRecrutement']);
        }

        $employe->setDateNaissance($dateNaissance);
        $employe->setDateRecrutement($dateRecrutement);


        $em = $doctrine->getManager();

        $em->persist($employe);
        $em->flush();

        return $this->handleView($this->view($employe));
    }
    #[Rest\Delete('employes/{id}', name: 'api_delete_employe', )]
    public function delete(Employe $employe, EmployeRepository $employeRepository): Response
    {
       // if ($this->isCsrfTokenValid('delete'.$employe->getId(), $request->request->get('_token'))) {
        $employeRepository->remove($employe, true);


        return new JsonResponse(
            '{"sttaus": "ok"}',
            Response::HTTP_OK,
            ['content-type' => 'application/json']
        );
    }
}
