# amqps://rvtlozhr:L_a5L2wFUpyFfW4L8e8JTc7-0n5cmeNH@jackal.rmq.cloudamqp.com/rvtlozhr
import pika, json

params = pika.URLParameters('amqps://rvtlozhr:L_a5L2wFUpyFfW4L8e8JTc7-0n5cmeNH@jackal.rmq.cloudamqp.com/rvtlozhr')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='admin', body=json.dumps(body), properties=properties)