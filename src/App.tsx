import { Container, Grid, Typography, styled } from '@mui/material'
import DescriptionItens from '~components/DescriptionItens'
import calc from '~assets/images/calc.png'
import Calculator from '~components/Calculator'
import AnchorLink from 'react-anchor-link-smooth-scroll'

function App() {
  return (
    <>
      <Container maxWidth="xl" sx={{ placeItems: 'center' }}>
        <Grid container mt={4} mb={12} id="intro">
          <Grid
            item
            xs={12}
            flexDirection={'row'}
            display={'flex'}
            alignContent={'flex-end'}
            justifyContent={'flex-end'}
            mr={2}
          >
            <Typography variant={'subtitle1'} sx={{ color: '#3051FF' }}>
              <AnchorLink style={{ textDecoration: 'none' }} href="#intro">
                Introdução
              </AnchorLink>
            </Typography>
            <Typography variant={'subtitle1'} sx={{ color: '#3051FF' }} ml={4}>
              <AnchorLink href="#calc" style={{ textDecoration: 'none', fontWeight: '500' }}>
                Calculadora
              </AnchorLink>
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="center" mb={10} id="intro">
          <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
            <img src={calc} width="85%" alt="Calculator"></img>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
            <Typography variant={'h4'} width={'70%'} mb={3}>
              Calculadora de previsão de tempo de execução de funções AWS Lambda
            </Typography>
            <DescriptionItens />
          </Grid>
        </Grid>
      </Container>

      <section style={{ backgroundColor: '#EEF1FF', height: '100vh' }} id="calc">
        <Calculator />
      </section>
    </>
  )
}

export default App
