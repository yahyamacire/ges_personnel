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
    #[Serializer\SerializedName("dateNaissance")]
    #[ORM\Column(type: 'date')]
    private $dateNaissance;

    #[ORM\Column(type: 'string', length: 255)]
    private $email;

    #[ORM\Column(type: 'integer')]
    private $telephone;
    #[Serializer\SerializedName("dateRecrutement")]
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
    #[Serializer\SerializedName("photo")]
    private $photo;

    #[Serializer\SerializedName("photoUrl")]
    private $photoUrl;

    #[ORM\OneToMany(mappedBy: 'employe', targetEntity: Diplome::class)]
    #[Serializer\SerializedName("diplomes")]
    private $diplome;

    #[ORM\OneToOne(targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[Serializer\SerializedName("user")]
    private $compte;

    #[ORM\OneToMany(mappedBy: 'employe', targetEntity: CompetenceLinguistique::class)]
    private $competenceLinguistique;

    #[ORM\ManyToMany(targetEntity: Projet::class, inversedBy: 'employes')]
    private $projet;

    #[ORM\OneToMany(mappedBy: 'employe', targetEntity: Competence::class)]
    private $competence;

    #[ORM\OneToMany(mappedBy: 'employe', targetEntity: Experience::class)]
    private $experience;

    #[ORM\ManyToOne(targetEntity: Structure::class, inversedBy: 'employes')]
    private $structure;


    public function __construct()
    {
        $this->diplome = new ArrayCollection();
        $this->competenceLinguistique = new ArrayCollection();
        $this->projet = new ArrayCollection();
        $this->competence = new ArrayCollection();
        $this->experience = new ArrayCollection();
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

    /**
     * @return Collection<int, CompetenceLinguistique>
     */
    public function getCompetenceLinguistique(): Collection
    {
        return $this->competenceLinguistique;
    }

    public function addCompetenceLinguistique(CompetenceLinguistique $competenceLinguistique): self
    {
        if (!$this->competenceLinguistique->contains($competenceLinguistique)) {
            $this->competenceLinguistique[] = $competenceLinguistique;
            $competenceLinguistique->setEmploye($this);
        }

        return $this;
    }

    public function removeCompetenceLinguistique(CompetenceLinguistique $competenceLinguistique): self
    {
        if ($this->competenceLinguistique->removeElement($competenceLinguistique)) {
            // set the owning side to null (unless already changed)
            if ($competenceLinguistique->getEmploye() === $this) {
                $competenceLinguistique->setEmploye(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPhotoUrl()
    {
        return $this->photoUrl;
    }

    /**
     * @param mixed $photoUrl
     */
    public function setPhotoUrl($photoUrl)
    {
        $this->photoUrl = $photoUrl;
    }


    /**
     * @return Collection<int, Projet>
     */
    public function getProjet(): Collection
    {
        return $this->projet;
    }

    public function addProjet(Projet $projet): self
    {
        if (!$this->projet->contains($projet)) {
            $this->projet[] = $projet;
        }

        return $this;
    }

    public function removeProjet(Projet $projet): self
    {
        $this->projet->removeElement($projet);

        return $this;
    }

    /**
     * @return Collection<int, Competence>
     */
    public function getCompetence(): Collection
    {
        return $this->competence;
    }

    public function addCompetence(Competence $competence): self
    {
        if (!$this->competence->contains($competence)) {
            $this->competence[] = $competence;
            $competence->setEmploye($this);
        }

        return $this;
    }

    public function removeCompetence(Competence $competence): self
    {
        if ($this->competence->removeElement($competence)) {
            // set the owning side to null (unless already changed)
            if ($competence->getEmploye() === $this) {
                $competence->setEmploye(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperience(): Collection
    {
        return $this->experience;
    }

    public function addExperience(Experience $experience): self
    {
        if (!$this->experience->contains($experience)) {
            $this->experience[] = $experience;
            $experience->setEmploye($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): self
    {
        if ($this->experience->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getEmploye() === $this) {
                $experience->setEmploye(null);
            }
        }

        return $this;
    }

    public function getStructure(): ?Structure
    {
        return $this->structure;
    }

    public function setStructure(?Structure $structure): self
    {
        $this->structure = $structure;

        return $this;
    }
}
