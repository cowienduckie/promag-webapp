import { Col, Row } from 'antd';

type CardDeckProps = {
  cards: React.ReactNode[];
  vGutter?: number;
  hGutter?: number;
  colNum: number;
  className?: string;
};

export const CardDeck = (props: CardDeckProps) => {
  const { cards, vGutter, hGutter, colNum, className } = props;
  const colSpan = Math.ceil(24 / colNum);

  return (
    <div className={className}>
      <Row gutter={[hGutter || 16, vGutter || 16]}>
        {cards.map((card, index) => (
          <Col key={index} span={colSpan}>
            {card}
          </Col>
        ))}
      </Row>
    </div>
  );
};
