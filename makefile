bundle:
	yarn build
upload: bundle
# 	aws s3 sync ./dist s3://qibolin --delete
flush:
# 	aws cloudfront create-invalidation --distribution-id E2DG2SW1MZIPTC --paths "/*"
deploy: bundle upload flush
