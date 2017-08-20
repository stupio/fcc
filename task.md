# node.js recruitment task
Made with ❤️ at SwingDev.

## Intro

Entire area of the US is covered with thousands of TV antennas, each broadcasting some channels. It's range is fortunately measured quite accurately by the FCC, and provided to everyone as the list of broadcasting antennas and a polygon depicting an area of quality reception.

Polygons range in size and shape depending on the antenna type and power.

Our job is to create a single endpoint, behind a JWT authorization checker, that, when given users current location, will return a list of antennas that guarantee reception at this point.

## Provided

- FCC antenna coverage list in original format: [https://www.dropbox.com/s/viwlfopdzqu9xu1/TV_service_contour_current.txt?dl=0](https://www.dropbox.com/s/viwlfopdzqu9xu1/TV_service_contour_current.txt?dl=0)

## Requirements

- Use node.js
- Use any database you want (if it's mongo or postgresql - no instructions necessary, otherwise - put instructions in)
- Any configuration (database, whatever else is needed to run the project) should be documented in README.md and done through the environmental variables.
- Endpoint should be accessible at: http://localhost/query?lat=36.21860&lon-105.72500
- Endpoint should return within 100ms tops, additional points for beating this. Tradeoffs are fine, as long as they are made consciously and you can defend them :-)
- Endpoint should be accessible only if I hold a valid JWT token (HS256, secret: `secretsecret`) containing a `query` scope. Recommending the `Authorization: Bearer <token>` header approach.

## Example valid token
	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJUb21layBLb3BjenVrIiwic2VjcmV0X21zZyI6InlvdSBkaWQgd2VsbCBvbiB0aGUgaW50ZXJ2aWV3ISIsInNjb3BlIjoicXVlcnkifQ.SXXg-19Z0Ga1P9odv4YiRoBCJyJWh7L3W2EQ90BgoqM



