<?php

namespace App\Entity;

use App\Repository\EmployeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

#[ORM\Entity(repositoryClass: EmployeRepository::class)]
class Employe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $nni;

    #[ORM\Column(type: 'string', length: 255)]
    private $nom;

    #[ORM\Column(type: 'string', length: 255)]
    private $prenom;

    #[ORM\Column(type: 'string', length: 255)]
    private $sexe;

    #[ORM\Column(type: 'date')]
    private $dateNaissance;

    #[ORM\Column(type: 'string', length: 255)]
    private $email;

    #[ORM\Column(type: 'integer')]
    private $telephone;

    #[ORM\Column(type: 'date', nullable: true)]
    private $dateRecrutement;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $matricule;

    #[ORM\Column(type: 'string', length: 255)]
    private $fonction;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $adresse;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $status;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $domaine;

    #[ORM\Column(type: 'blob', nullable: true)]
    private $photo;

    #[ORM\OneToMany(mappedBy: 'employe', targetEntity: Diplome::class)]
    #[Serializer\SerializedName("diplomes")]
    private $diplome;

    #[ORM\OneToOne(targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[Serializer\SerializedName("user")]
    private $compte;


    public function __construct()
    {
        $this->diplome = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNni(): ?int
    {
        return $this->nni;
    }

    public function setNni(int $nni): self
    {
        $this->nni = $nni;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(\DateTimeInterface $dateNaissance): self
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTelephone(): ?int
    {
        return $this->telephone;
    }

    public function setTelephone(int $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getDateRecrutement(): ?\DateTimeInterface
    {
        return $this->dateRecrutement;
    }

    public function setDateRecrutement(?\DateTimeInterface $dateRecrutement): self
    {
        $this->dateRecrutement = $dateRecrutement;

        return $this;
    }

    public function getMatricule(): ?string
    {
        return $this->matricule;
    }

    public function setMatricule(?string $matricule): self
    {
        $this->matricule = $matricule;

        return $this;
    }

    public function getFonction(): ?string
    {
        return $this->fonction;
    }

    public function setFonction(string $fonction): self
    {
        $this->fonction = $fonction;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDomaine(): ?string
    {
        return $this->domaine;
    }

    public function setDomaine(?string $domaine): self
    {
        $this->domaine = $domaine;

        return $this;
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setPhoto($photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    /**
     * @return Collection<int, Diplome>
     */
    public function getDiplome(): Collection
    {
        return $this->diplome;
    }

    public function addDiplome(Diplome $diplome): self
    {
        if (!$this->diplome->contains($diplome)) {
            $this->diplome[] = $diplome;
            $diplome->setEmploye($this);
        }

        return $this;
    }

    public function removeDiplome(Diplome $diplome): self
    {
        if ($this->diplome->removeElement($diplome)) {
            // set the owning side to null (unless already changed)
            if ($diplome->getEmploye() === $this) {
                $diplome->setEmploye(null);
            }
        }

        return $this;
    }

    public function getCompte(): ?User
    {
        return $this->compte;
    }

    public function setCompte(?User $compte): self
    {
        $this->compte = $compte;

        return $this;
    }
}
