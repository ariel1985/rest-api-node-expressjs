# REST API 

REST API with nodejs and epxress framework. 

# Installations
`cd app
npm init`

# Run
To run the app in Terminal from the app root folder 

`node app.js`

### Requests
To make a request use and REST client via CURL
` 
curl --header "Content-Type: application/json"   --request POST   --data '{"filter": []}'   http://localhost:3000

curl --header "Content-Type: application/json"   --request POST   --data '{"filters":[{"field":"average age","operators":{"lt":40,"gt":25}},{"field":"distance from city center","operators":{"lt":10}},{"field":"average income","operators":{"sort":"desc"}}]}' http://localhost:3000
`

Each filter generates new dataset
**Warning** eq (equals) function cannot be used with lt or gt. 

`
{
    "filters": []
}

{
    "filters": [
        {
            "field":"average age",
            "operators":{
                "lt": 40,
                "gt": 25
            }
        },
        {
            "field": "distance from city center",
            "operators":{
                "lt": 10
            }
        },
        {
            "field": "average income",
            "operators":{
                "sort": "desc"
            }
        
        }
    ]
}

{
    "filters": [
        {
            "field":"average income",
            "operators":{
                "gt": 99000
            }
        },
        {
            "field":"average age",
            "operators":{
            	"gt": 30,
                "sort": "ascd"
            }
        }
    ]
}

`
**Notice**: Default sort is asc unless desc is written

## To do:

 * test case for each filter
 * no filter - return all 
 * Create a unified function for checking if number / string etc...

