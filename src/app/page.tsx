'use client';

import { styled } from '@/styles'

export default function Home() {
  return (
    <StyledContainer>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse perferendis mollitia ratione voluptate molestiae quod expedita quae voluptatibus recusandae quidem, nisi nulla temporibus. Natus fugit non recusandae ea sed temporibus!
    </StyledContainer>
  )
}

const StyledContainer = styled('div', {
  padding: 32
})