import Mock from 'mockjs'


/**
 * 
 * 
const flight = {
    flightNumber: 'AK1514',
    departureTime: '21:45',
    departureDate: '2021-10-01',
    departureAirport: 'FZU',
    arrivalAirport: 'KUL',
    passengers: 20
}
 */
export default [
    {
        url: '/api/flight/list',
        method: 'get',
        response: () => {
            const generateFlightNumber = () => {
                const prefixes = ['AK', 'CA', 'MU', "CZ", "HU", "3U", "MF", "ZH"];
                const selectedPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                return selectedPrefix + randomDigits;
            };
    
            const flightList = Array.from({ length: 10 }, () => ({
                flightNumber: generateFlightNumber(),
                departureTime: "21:45",
                departureDate: "2023-10-01",
                departureAirport: "FZU",
                arrivalAirport: "KUL",
                passengers: 20
            }));
    
            return {
                "code": 200,
                "data": {
                    "list": flightList
                }
            };
        }
    },{
        url: '/api/login',
        method: 'post',
        response: () => {
            return {
                "code": 200,
                "data": {
                    "username": "admin",
                    "token": "admin"
                }
            };
        }
    },{
        url: '/api/rootjam/login',
        method: 'post',
        response: () => {
            return {
                "code": 200,
                "data": {
                    "username": "rootjam",
                    "token": "rootjam",
                }
            }
        }
    },{
        // url: '/api/flight/detail',
        url: '/api/flight/detail',
        method: 'get',
        response: () => {
            return {
                "code": 200,
                "data": {
                    "flightNumber": "AK1514",
                    "departureTime": new Date().getTime(),
                    "departureAirport": "FZU",
                    "arrivalAirport": "KUL",
                    "passengers": 20
                }
            }
        }
    }
]