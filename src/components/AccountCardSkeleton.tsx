import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'

const AccountCardSkeleton = () => {
  return (
    <Card>
      <CardBody>
        <Skeleton height="20px" marginBottom={3} />
        <SkeletonText />
      </CardBody>
    </Card>
  )
}

export default AccountCardSkeleton