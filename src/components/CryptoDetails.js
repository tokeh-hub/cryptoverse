import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Row, Col, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined, TrophyOutlined } from '@ant-design/icons/lib/icons'
import { LineChart } from './LineChart'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../components/cryptoApi'
import Loader from './Loader'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinID } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinID)
  const { data: coinHistory } = useGetCryptoHistoryQuery(coinID, timePeriod)
  
  if (!coinHistory) { return <Loader/> }

  const cryptoDetails = data?.data?.coin

  if (isFetching) { return <Loader/> }

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];



  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails && cryptoDetails.volume}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails && millify(cryptoDetails?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${data?.data && millify(cryptoDetails?.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${data?.data && millify(cryptoDetails?.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-headiing-container'>
        <Title level={2} className='coin-name'>{cryptoDetails?.name}({cryptoDetails?.slug}) Price</Title>
        <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} coinName={cryptoDetails?.name} currentPrice={data?.data && millify(cryptoDetails?.price)} />
      <Col className="stats-container">
        <Col className="coin-value-statistics" xs={24} sm={24} lg={12}>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col><Col className="coin-value-statistics" xs={24} sm={24} lg={12}>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Statistics</Title>
            <p>An overview showing the other statistics, such as the number of markets, exchanges circulating, total and approved supplies.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>{link.type}</Title>
              <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>

  )
}

export default CryptoDetails