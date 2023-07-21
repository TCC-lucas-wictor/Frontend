import { Container, Typography, Box, Button, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { DefaultApi } from '~services/api'
import { parseInt } from 'lodash'

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
  const [memory, setMemory] = useState('')
  const [number, setNumber] = useState('')
  const [response, setResponse] = useState('')
  const [type, setType] = useState('')
  const [tCost, setTcost] = useState(0)

  const CalcSchema = Yup.object().shape({
    qtd_inputs: Yup.string().required('A quantidade de inputs é obrigatória'),
  })

  const calculateLambdaCost = (requestsPerMonth, memoryMB, executionTimeMS) => {
    const memoryGB = memoryMB / 1024
    const cost = requestsPerMonth * memoryGB * executionTimeMS * 0.0000166667
    return cost
  }

  const formik = useFormik({
    initialValues: {
      qtd_inputs: '',
      complexidade: '',
      req_api: '0',
    },
    validationSchema: CalcSchema,

    onSubmit: () => {
      if (formik.values.complexidade === '1') {
        setType('predictDecisionTree')
        setComplexidade('Constante')
      } else if (formik.values.complexidade === '2') {
        setType('predictDecisionTree')
        setComplexidade('Linear(O(n))')
      } else if (formik.values.complexidade === '3') {
        setType('predictDecisionTree')
        setComplexidade('Linearítmica(O(n log n))')
      } else if (formik.values.complexidade === '4') {
        setType('predictPolynomialRegression')
        setComplexidade('Quadrática(O(n²))')
      }

      setInputs(formik.values.qtd_inputs)
      DefaultApi.post(type, formik.values)
        .then((res: Data) => {
          setResponse(res?.data[0])
          setResult(true)
        })
        .catch((err) => {
          console.log(err)
        })
      const total = calculateLambdaCost(number, memory, response)
      console.log(total)
      setTcost(total)
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
                      {response > '900' ? (
                        <Typography variant="subtitle1" mb={3}>
                          Esta função excede o limite de tempo de execução de funções dentro do AWS Lambda, tente
                          novamente.
                        </Typography>
                      ) : (
                        <>
                          <Typography variant="subtitle1" mb={3}>
                            Para uma função de complexidade <b>{complexidade}</b> e quantidade de inputs <b>{inputs}</b>
                            , Estimamos que o tempo de execução da sua função será de:
                          </Typography>

                          <Typography variant="h5" mb={3} textAlign={'center'}>
                            {parseFloat(response).toFixed(2)} segundos
                          </Typography>

                          <Typography variant="subtitle1" mb={3}>
                            Estimamos que o custo de execução da sua requisição será de:
                          </Typography>
                          <Typography variant="h5" mb={3} textAlign={'center'}>
                            $ {tCost.toFixed(2)}  USD/Mês
                           
                          </Typography>
                        </>
                      )}

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
                        <MenuItem value={'1'}>Constante</MenuItem>
                        <MenuItem value={'2'}>Linear(O(n))</MenuItem>
                        <MenuItem value={'3'}>Linearítmica(O(n log n))</MenuItem>
                        <MenuItem value={'4'}>Quadrática(O(n²))</MenuItem>
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
                    <Box display={'flex'} flexDirection={'row'} gap={3}>
                      <TextField
                        sx={{ height: '50px' }}
                        fullWidth
                        type="number"
                        label="Quantidade de Execuções da função"
                        value={number}
                        onChange={(e) => {
                          setNumber(e.target.value)
                        }}
                        error={Boolean(touched.qtd_inputs && errors.qtd_inputs)}
                        helperText={touched.qtd_inputs && errors.qtd_inputs}
                      />
                      <Select
                        fullWidth
                        sx={{ height: '56px' }}
                        label="Memory"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={memory}
                        onChange={(e) => {
                          setMemory(e.target.value)
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Mémoria Alocada</em>
                        </MenuItem>
                        <MenuItem value={128}>128 MB</MenuItem>
                        <MenuItem value={512}>512 MB</MenuItem>
                        <MenuItem value={1024}>1024 MB</MenuItem>
                        <MenuItem value={1536}>1536 MB</MenuItem>
                        <MenuItem value={2048}>2048 MB</MenuItem>
                        <MenuItem value={3072}>3072 MB</MenuItem>
                        <MenuItem value={4096}>4096 MB</MenuItem>
                        <MenuItem value={5120}>5120 MB</MenuItem>
                        <MenuItem value={6144}>6144 MB</MenuItem>
                        <MenuItem value={7168}>7168 MB</MenuItem>
                        <MenuItem value={8192}>8192 MB</MenuItem>
                        <MenuItem value={9216}>9216 MB</MenuItem>
                        <MenuItem value={10240}>10.240 MB</MenuItem>
                      </Select>
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
