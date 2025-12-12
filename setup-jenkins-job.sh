#!/bin/bash

# Jenkins configuration
JENKINS_URL="https://jenkins.consltr.com"
JOB_NAME="consltr-portfolio"
JENKINS_USER="${JENKINS_USER:-admin}"
JENKINS_API_TOKEN="${JENKINS_API_TOKEN}"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Jenkins job for Consltr Portfolio...${NC}"

# Check if API token is set
if [ -z "$JENKINS_API_TOKEN" ]; then
    echo -e "${RED}Error: JENKINS_API_TOKEN environment variable is not set${NC}"
    echo "Please set it with: export JENKINS_API_TOKEN=your_token_here"
    exit 1
fi

# Check if job already exists
echo "Checking if job exists..."
if curl -s -o /dev/null -w "%{http_code}" \
    -u "${JENKINS_USER}:${JENKINS_API_TOKEN}" \
    "${JENKINS_URL}/job/${JOB_NAME}/api/json" | grep -q "200"; then
    
    echo -e "${YELLOW}Job ${JOB_NAME} already exists. Updating configuration...${NC}"
    
    # Update existing job
    curl -X POST \
        -u "${JENKINS_USER}:${JENKINS_API_TOKEN}" \
        "${JENKINS_URL}/job/${JOB_NAME}/config.xml" \
        --data-binary @jenkins-job-config.xml \
        -H "Content-Type: text/xml"
else
    echo -e "${GREEN}Creating new job ${JOB_NAME}...${NC}"
    
    # Create new job
    curl -X POST \
        -u "${JENKINS_USER}:${JENKINS_API_TOKEN}" \
        "${JENKINS_URL}/createItem?name=${JOB_NAME}" \
        --data-binary @jenkins-job-config.xml \
        -H "Content-Type: text/xml"
fi

# Check if operation was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Jenkins job configured successfully!${NC}"
    echo -e "${GREEN}View job at: ${JENKINS_URL}/job/${JOB_NAME}${NC}"
    
    # Trigger first build
    echo -e "${YELLOW}Triggering initial build...${NC}"
    curl -X POST \
        -u "${JENKINS_USER}:${JENKINS_API_TOKEN}" \
        "${JENKINS_URL}/job/${JOB_NAME}/build"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build triggered successfully!${NC}"
        echo -e "${GREEN}Monitor build at: ${JENKINS_URL}/job/${JOB_NAME}${NC}"
    fi
else
    echo -e "${RED}❌ Failed to configure Jenkins job${NC}"
    exit 1
fi