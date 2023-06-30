import { Box, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CodeIcon from '@mui/icons-material/Code'
import ShowChartIcon from '@mui/icons-material/ShowChart'


function DescriptionItens() {
  return (
    <>
      <Box display={'flex'} flexDirection={'row'} mt={2}>
        <Box
          display="flex"
          borderRadius={100}
          width={68}
          height={48}
          border={'2px #4F4F4F solid'}
          mr={3}
          justifyContent={'center'}
          alignContent={'center'}
          alignItems={'center'}
        >
          <AccessTimeIcon />
        </Box>

        <Box>
          <Typography variant={'h5'}>
            Escolha a complexidade e a quantidade de parâmetros para execução da função
          </Typography>
          <Typography variant={'subtitle1'} mt={1}>
            A complexidade de uma função é uma medida de quanto tempo e recursos computacionais a função precisa para
            executar.
          </Typography>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'row'} mt={2}>
        <Box
          display="flex"
          borderRadius={100}
          width={128}
          height={48}
          border={'2px #4F4F4F solid'}
          mr={3}
          justifyContent={'center'}
          alignContent={'center'}
          alignItems={'center'}
        >
          <ShowChartIcon />
        </Box>

        <Box>
          <Typography variant={'h5'}>Calcule o custo de execução de suas funções</Typography>
          <Typography variant={'subtitle1'} mt={1}>
            O custo de execução das funções Lambda na AWS (Amazon Web Services) é determinado com base no número de
            solicitações feitas às suas funções e na quantidade de tempo que suas funções levam para serem executadas.
          </Typography>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'row'} mt={2}>
        <Box
          display="flex"
          borderRadius={100}
          width={48}
          height={48}
          border={'2px #4F4F4F solid'}
          mr={3}
          justifyContent={'center'}
          alignContent={'center'}
          alignItems={'center'}
        >
          <CodeIcon />
        </Box>

        <Box>
          <Typography variant={'h5'}>Baseado em funções Python</Typography>
          <Typography variant={'subtitle1'} mt={1}>
            Para nossos cálculos de estimativa nos baseamos em funções python.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default DescriptionItens
