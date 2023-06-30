import { Container, Typography, Box, Button, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { DefaultApi } from '~services/api'

const RootStyle = styled('div')({
  background: '#EEF1FF',
  height: '100vh',
  display: 'grid',
  placeItems: 'center',
})

const HeadingStyle = styled(Box)({
  textAlign: 'center',
})

const ContentStyle = styled('div')({
  borderRadius: '10px',
  maxWidth: 1000,
  padding: 25,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: '#fff',
})

interface Data {
  data: string[]
}

const Calculator = () => {
  const [result, setResult] = useState(false)
  const [complexidade, setComplexidade] = useState('')
  const [inputs, setInputs] = useState('')
  const [response, setResponse] = useState('')

  const CalcSchema = Yup.object().shape({
    qtd_inputs: Yup.string().required('A quantidade de inputs é obrigatória'),
  })

  const formik = useFormik({
    initialValues: {
      qtd_inputs: '',
      complexidade: '',
      req_api: '0',
    },
    validationSchema: CalcSchema,

    onSubmit: () => {
      if (formik.values.complexidade === '1') {
        setComplexidade('Linear(O(n))')
      } else if (formik.values.complexidade === '2') {
        setComplexidade('Linearítmica(O(n log n))')
      } else if (formik.values.complexidade === '3') {
        setComplexidade('Quadrática(O(n²))')
      } else if (formik.values.complexidade === '4') {
        setComplexidade('Cúbica(O(n³)')
      }

      setInputs(formik.values.qtd_inputs)
      DefaultApi.post('predictPolynomialRegression', formik.values)
        .then((res: Data) => {
          setResponse(res?.data[0])
          setResult(true)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log(formik.values)
    },
  })

  const { errors, touched, handleSubmit, getFieldProps } = formik

  return (
    <section>
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <HeadingStyle>
              <Typography variant="h5" mb={5}>
                Calculadora AWS Lambda
              </Typography>
            </HeadingStyle>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                {result ? (
                  <>
                    <Box display={'flex'} flexDirection={'column'} gap={1} mx={6}>
                      <Typography variant="h5">Resultado:</Typography>

                      <Typography variant="subtitle1" mb={3}>
                        Para uma função de complexidade <b>{complexidade}</b> e quantidade de inputs <b>{inputs}</b>,
                        Estimamos que o tempo de execução da sua função será de:
                      </Typography>

                      <Typography variant="h5" mb={3} textAlign={'center'}>
                        {response} segundos
                      </Typography>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          setResult(false)
                          formik.resetForm()
                        }}
                        sx={{ borderRadius: '40px', width: '80%', alignSelf: 'center' }}
                      >
                        Calcular novamente
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box display={'flex'} flexDirection={'column'} gap={3}>
                    <Box display={'flex'} flexDirection={'row'} gap={3}>
                      <Select
                        fullWidth
                        sx={{ height: '56px' }}
                        label="Complexidade"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...getFieldProps('complexidade')}
                      >
                        <MenuItem disabled value="">
                          <em>Complexidade</em>
                        </MenuItem>
                        <MenuItem value={'1'}>Linear(O(n))</MenuItem>
                        <MenuItem value={'2'}>Linearítmica(O(n log n))</MenuItem>
                        <MenuItem value={'3'}>Quadrática(O(n²))</MenuItem>
                        <MenuItem value={'4'}>Cúbica(O(n³))</MenuItem>
                      </Select>
                      <TextField
                        sx={{ height: '50px' }}
                        fullWidth
                        type="number"
                        label="Quantidade de inputs"
                        {...getFieldProps('qtd_inputs')}
                        error={Boolean(touched.qtd_inputs && errors.qtd_inputs)}
                        helperText={touched.qtd_inputs && errors.qtd_inputs}
                      />
                    </Box>
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{ borderRadius: '40px', width: '50%', alignSelf: 'center', marginTop: 2 }}
                    >
                      Calcular
                    </Button>
                  </Box>
                )}
              </Form>
            </FormikProvider>
          </ContentStyle>
        </Container>
      </RootStyle>
    </section>
  )
}

export default Calculator
