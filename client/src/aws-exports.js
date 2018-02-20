// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const awsmobile = {
    'aws_cloud_logic': 'enable',
    'aws_cloud_logic_custom': [{"id":"ew1blya5tf","name":"ReactSample","description":"","endpoint":"https://ew1blya5tf.execute-api.eu-west-1.amazonaws.com/Development","region":"eu-west-1","paths":["/items","/items/123"]}],
    'aws_cognito_identity_pool_id': 'eu-west-1:e59b44b2-d1a6-4adc-85c3-26d78123554c',
    'aws_cognito_region': 'eu-west-1',
    'aws_content_delivery': 'enable',
    'aws_content_delivery_bucket': 'reactsamplerestauran-hosting-mobilehub-1587774836',
    'aws_content_delivery_bucket_region': 'eu-west-1',
    'aws_content_delivery_cloudfront': 'enable',
    'aws_content_delivery_cloudfront_domain': 'd1ksood08z4iby.cloudfront.net',
    'aws_dynamodb': 'enable',
    'aws_dynamodb_all_tables_region': 'eu-west-1',
    'aws_dynamodb_table_schemas': [{"tableName":"reactsamplerestauran-mobilehub-1587774836-bbq_restaurants","attributes":[{"name":"id","type":"S"}],"indexes":[],"region":"eu-west-1","hashKey":"id"},{"tableName":"reactsamplerestauran-mobilehub-1587774836-bbq_menu_item","attributes":[{"name":"restaurant_id","type":"S"},{"name":"id","type":"S"}],"indexes":[],"region":"eu-west-1","hashKey":"restaurant_id","rangeKey":"id"},{"tableName":"reactsamplerestauran-mobilehub-1587774836-bbq_orders","attributes":[{"name":"id","type":"S"}],"indexes":[],"region":"eu-west-1","hashKey":"id"}],
    'aws_mandatory_sign_in': 'enable',
    'aws_project_id': 'ae6055b8-457b-4780-b791-91eb9b7057eb',
    'aws_project_name': 'react-sample-restaurant-menu',
    'aws_project_region': 'eu-west-1',
    'aws_resource_bucket_name': 'reactsamplerestauran-deployments-mobilehub-1587774836',
    'aws_resource_name_prefix': 'reactsamplerestauran-mobilehub-1587774836',
    'aws_sign_in_enabled': 'enable',
    'aws_user_pools': 'enable',
    'aws_user_pools_id': 'eu-west-1_ifsoS3HzU',
    'aws_user_pools_mfa_type': 'ON',
    'aws_user_pools_web_client_id': '1rkiblvehs3hf8e8ad4ust8e67',
}

export default awsmobile;
