<?php

namespace App\Repository;

use App\Entity\CompetenceLinguistique;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CompetenceLinguistique>
 *
 * @method CompetenceLinguistique|null find($id, $lockMode = null, $lockVersion = null)
 * @method CompetenceLinguistique|null findOneBy(array $criteria, array $orderBy = null)
 * @method CompetenceLinguistique[]    findAll()
 * @method CompetenceLinguistique[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompetenceLinguistiqueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CompetenceLinguistique::class);
    }

    public function add(CompetenceLinguistique $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CompetenceLinguistique $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return CompetenceLinguistique[] Returns an array of CompetenceLinguistique objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CompetenceLinguistique
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
