import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, isNewShoe, pluralize } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let flag;
  let backgroundColor;
  if (variant === 'on-sale') {
    flag = 'Sale';
    backgroundColor = 'hsla(340, 65%, 47%, 1)';
  } else if (variant === 'new-release') {
    flag = 'Just released!';
    backgroundColor = 'hsla(240, 60%, 63%, 1)';
  } else if (variant === 'default') {
    flag = '';
    backgroundColor = '';
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{salePrice && formatPrice(salePrice)}</SalePrice>
        </Row>
        <Flag
          style={{
            '--background-color': backgroundColor,
          }}
        >
          {flag}
        </Flag>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) => {
    return p.variant === 'on-sale' ? 'line-through' : 'none';
  }};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 32px;
  color: hsla(0, 0%, 100%, 1);
  font-size: 14px;
  font-weight: 700;
  background-color: var(--background-color);
  border-radius: 2px;
  margin-right: -4px;
  padding: 9px;
  display: flex;
  align-items: center;
`;

export default ShoeCard;
