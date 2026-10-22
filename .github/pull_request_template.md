## Summary
 
<!-- What does this PR do, and why? -->
 
## Related issue
 
<!-- e.g. Closes #123 -->
 
## Type of change
 
- [ ] Bug fix
- [ ] New feature / endpoint
- [ ] Breaking change (changes existing API behavior or response shape)
- [ ] Database / model change
- [ ] Refactor or chore
- [ ] Documentation (README / Swagger)
## Changes
 
<!-- Bullet the key changes. Note which controllers, models, or middlewares were touched. -->
 
-
## API changes
 
<!-- List any new or modified endpoints. Delete this section if none. -->
 
| Method | Route | Auth | Notes |
| ------ | ----- | ---- | ----- |
|        |       |      |       |
 
## Database changes
 
<!-- Delete this section if none. -->
 
- [ ] Sequelize model(s) added or changed
- [ ] Existing data affected (needs a migration or manual step on deploy)
- [ ] Associations in `db.js` / `models/index.js` updated
## How to test
 
<!-- Steps a reviewer can follow locally: requests, sample payloads, expected results. -->
 
1.
2.
## Checklist
 
- [ ] Runs locally with `npm start` and no errors
- [ ] Tested affected endpoints (Postman / Swagger UI at `/api-docs`)
- [ ] Protected routes still require a valid JWT (`validate` / `employer-validate`)
- [ ] Swagger JSDoc comments updated for new or changed endpoints
- [ ] No secrets or `.env` values committed
- [ ] New environment variables documented and added in Render
- [ ] README updated if setup or usage changed
## Screenshots / responses
 
<!-- Optional: sample request/response bodies or Swagger screenshots. -->
 
## Notes for reviewers
 
<!-- Anything to look at closely, known limitations, or follow-up work. -->
 