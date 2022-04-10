import {Skeleton, Card} from "antd";
export default function ProductSkeleton() {
  return (
    <>
      <Card className="skeleton">
        <Skeleton.Avatar active={true} size="large" />
        <Skeleton.Image className="skeleton__img" />
        <Skeleton active={true} className="skeleton__text" />
      </Card>
      <style>
        {`
             .skeleton__img{ 
margin-top: -1rem;
    display: flex;
    justify-content: center;
      }
         .skeleton__text{ 
    transform: rotateX(180deg);
      }
       .skeleton__text li:last-child{display:none  }
      `}
      </style>
    </>
  );
}
