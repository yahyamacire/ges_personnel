<?php

namespace App\Controller;

use App\Entity\Projet;
use App\Entity\Structure;
use App\Repository\EmployeRepository;
use App\Repository\ProjetRepository;
use App\Repository\StructureRepository;
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

        foreach ($list as $employe){
            if($employe->getPhoto() != null){


                $content = '';
                while(!feof($employe->getPhoto())){
                    $content.= fread($employe->getPhoto(), 1024);
                }
                rewind($employe->getPhoto());

                $employe->setPhoto($content);
            }
        }
        return $this->handleView($this->view($list));
    }

    #[Rest\Get('structures/employes/{id}', name: 'api_list_structure_employes')]
    public function listEmployerStructure(Structure $structure , EmployeRepository $employeRepository)
    {

        $list = $employeRepository->findBy(['structure' => $structure->getId()]);

        foreach ($list as $employe){
            if($employe->getPhoto() != null){


                $content = '';
                while(!feof($employe->getPhoto())){
                    $content.= fread($employe->getPhoto(), 1024);
                }
                rewind($employe->getPhoto());

                $employe->setPhoto($content);
            }
        }
        return $this->handleView($this->view($list));
    }

    #[Rest\Post('employes', name: 'api_new_employe', )]
    public function new(Request $request, ManagerRegistry  $doctrine, StructureRepository $structureRepository)
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
        $description = isset($parameters['description']) ? $parameters['description'] : null ;



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
        $employe->setDescription($description);



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

        if(isset($parameters['structure'])){
            $structure= $parameters['structure'];

            $structure = $structureRepository->find($structure['id']);
            $employe->setStructure($structure);

        }


        $em = $doctrine->getManager();

        $em->persist($employe);
        $em->flush();


        return $this->handleView($this->view($employe));
    }


    #[Rest\Get('employes-fonctions/{fonction}', name: 'api_get_employe_fonction')]
    public function getEmployefonction($fonction, EmployeRepository $employeRepository)
    {


        if($fonction == 'AUTRE'){
            $employes=$employeRepository->autresEmployers();
        }else{
            $employes=$employeRepository->findBy([
                'fonction' => $fonction
            ]);

        }



    foreach ($employes as $employe){
       if($employe->getPhoto() != null){


            $content = '';
            while(!feof($employe->getPhoto())){
                $content.= fread($employe->getPhoto(), 1024);
            }
            rewind($employe->getPhoto());

            $employe->setPhoto($content);
        }

    }

        return $this->handleView($this->view($employes));

}


    #[Rest\Get('employes/{id}', name: 'api_get_employe')]
    public function getEmployes(Employe $employe)
    {

        if($employe->getPhoto() != null){


            $content = '';
            while(!feof($employe->getPhoto())){
                $content.= fread($employe->getPhoto(), 1024);
            }
            rewind($employe->getPhoto());

            $employe->setPhoto($content);
        }
        return $this->handleView($this->view($employe));
    }

    #[Rest\Get('employer-connecte', name: 'api_get_employe_actif')]
    public function getEmployeConnecte()
    {

        $employe = $this->getUser()->getEmploye();

        if($employe != null && $employe->getPhoto() != null){


            $content = '';
            while(!feof($employe->getPhoto())){
                $content.= fread($employe->getPhoto(), 1024);
            }
            rewind($employe->getPhoto());

            $employe->setPhoto($content);
        }
        return $this->handleView($this->view($employe));
    }

    #[Rest\Put('employes/{id}', name: 'api_edit_employe', )]
    public function edit(Request $request, ManagerRegistry  $doctrine, Employe $employe , StructureRepository $structureRepository)
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
        $description = isset($parameters['description']) ? $parameters['description'] : null ;



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
        $employe->setDescription($description);


        if($dateNaissance != null) {
            $dateNaissance = new DateTime($parameters['dateNaissance']);
        }
        if($dateRecrutement != null) {
            $dateRecrutement = new DateTime($parameters['dateRecrutement']);
        }

        $employe->setDateNaissance($dateNaissance);
        $employe->setDateRecrutement($dateRecrutement);

        if(isset($parameters['structure'])){
            $structure= $parameters['structure'];



            $structure = $structureRepository->find($structure['id']);

            $employe->setStructure($structure);

        }

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
