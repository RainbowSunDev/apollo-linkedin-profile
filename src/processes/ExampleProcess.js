import got from 'got';

import { makeId } from '#src/utils/ids.js'
import { success, failure } from '#src/utils/response.js'
import Process from './Process.js'

const API_ENDPOINT = "https://api.apollo.io/v1/people/match";

class EmploymentHistory {
  constructor(data) {
      this._id = data._id || "";
      this.createdAt = data.created_at || null;
      this.current = data.current || false;
      this.degree = data.degree || "";
      this.description = data.description || "";
      this.emails = data.emails || "";
      this.end_date = data.end_date || null;
      this.grade_level = data.grade_level || "";
      this.kind = data.kind || "";
      this.major = data.major || "";
      this.organization_id = data.organization_id || "";
      this.organization_name = data.organization_name || "";
      this.raw_address = data.raw_address || "";
      this.start_date = data.start_date || null;
      this.title = data.title || "";
      this.updated_at = data.updated_at || null;
      this.id = data.id || "";
      this.key = data.key || "";
  }
}

class Organization {
  constructor(data) {
      this.id = data.id || "";
      this.name = data.name || null;
      this.website_url = data.website_url || "";
      this.blog_url = data.blog_url || "";
      this.angellist_url = data.angellist_url || "";
      this.linkedin_url = data.linkedin_url || "";
      this.twitter_url = data.twitter_url || "";
      this.facebook_url = data.facebook_url || "";
      this.primary_phone = data.primary_phone || null;
      this.languages = data.languages || null;
      this.alexa_ranking = data.alexa_ranking || "";
      this.phone = data.phone || "";
      this.linkedin_uid = data.linkedin_uid || "";
      this.founded_year = data.founded_year || null;
      this.publicly_traded_symbol = data.publicly_traded_symbol || "";
      this.publicly_traded_exchange = data.publicly_traded_exchange || "";
      this.logo_url = data.logo_url || "";
      this.crunchbase_url = data.crunchbase_url || "";
      this.primary_domain = data.primary_domain || "";
      this.industry = data.industry || "";
      this.keywords = data.keywords || null;
      this.estimated_num_employees = data.estimated_num_employees || NaN;
      this.industries = data.industries || null;
      this.secondary_industries = data.secondary_industries || null;
      this.snippets_loaded = data.snippets_loaded || false;
      this.industry_tag_id = data.industry_tag_id || "";
      this.industry_tag_hash = data.industry_tag_hash || null;
      this.retail_location_count = data.retail_location_count || NaN;
      this.owned_by_organization_id = data.owned_by_organization_id || "";
      this.suborganizations = data.suborganizations || null;
      this.num_suborganizations = data.num_suborganizations || NaN;
      this.seo_description = data.seo_description || "";
      this.short_description = data.short_description || "";
      this.total_funding = data.total_funding || "";
      this.total_funding_printed = data.total_funding_printed || "";
      this.latest_funding_round_date = data.latest_funding_round_date || "";
      this.latest_funding_stage = data.latest_funding_stage || "";
      this.funding_events = data.funding_events || null;
      this.technology_names = data.technology_names || null;
      this.current_technologies = data.current_technologies || null;

  }
}
// the model of apollo data
class Profile {
  constructor(data = {}) {
      this.first_name = data.first_name || "";
      this.last_name = data.last_name || "";
      this.name = data.name || "";
      this.linkedin_url = data.linkedin_url || "";
      this.title = data.title || "";
      this.email_status = data.email_status || "";
      this.photo_url = data.photo_url || "";
      this.twitter_url = data.twitter_url || "";
      this.github_url = data.github_url || "";
      this.facebook_url = data.facebook_url || "";
      this.extrapolated_email_confidence = data.extrapolated_email_confidence || "";
      this.headline = data.headline || "";
      this.email = data.email || "";
      this.organization_id = data.organization_id || "";
      this.intent_strength = data.intent_strength || "";
      this.show_intent = data.show_intent || "";
      this.revealed_for_current_team = data.revealed_for_current_team || true;
      this.departments = data.departments || null;
      this.subdepartments = data.subdepartments || null;
      this.functions = data.functions || null;
      this.seniority = data.seniority || "";
      this.revealed_for_current_team = data.revealed_for_current_team || false;

      this.headline_bio = data.headline_bio || "";
      this.city = data.city || "";
      this.state = data.state || "";
      this.country = data.country || "";
      this.contact_present_raw_address = data.contact_present_raw_address || "";
      this.organization_city = data.organization_city || "";
      this.organization_state = data.organization_state || "";                                                                            
      
      
      this.personal_emails = data.personal_emails || "";
      this.personal_phone_numbers = data.personal_phone_numbers || "";
      this.current_company_linkedin_organization_id = data.current_company_linkedin_organization_id || "";
      this.previous_company_linkedin_organization_id = data.previous_company_linkedin_organization_id || "";
      
      this.employmentHistory = null;
      this.current_company = "";
      this.current_job_title = "";
      this.current_job_years_months="";
      this.previous_company = "";
      this.previous_job_title = "";
      this.previous_job_years_months = "";
      this.organization = null;
      this.linkedin_uid = "";
      this.organization_website_url = "";
      this.organization_linkedin_url = "";
      this.organization_seo_description = "";
      this.organization_short_description = "";
      // For nested objects or arrays of objects, instantiate them
      if (data.employment_history) {
          this.employmentHistory = data.employment_history.map(emp => new EmploymentHistory(emp));
          
          this.employmentHistory.forEach((item, index) => {

              if( item.current ) {

                  const start_date = item.start_date;
                  const end_date = item.end_date;
                  if(start_date && end_date) {
                      this.current_job_years_months = this.calculateDuration(start_date, end_date); 
                  }

                  this.current_company = item.organization_name;
                  this.current_job_title = item.title;
              }else {

                  const start_date = item.start_date;
                  const end_date = item.end_date;
                  if(start_date && end_date) {
                      this.previous_job_years_months = this.calculateDuration(start_date, end_date); 
                  }

                  this.previous_company = item.organization_name;
                  this.previous_job_title = item.title;
              }
              
          });
      } 
      // Assuming the actual data has a nested organization object 
      // (If the API provides it as part of the person data)
      if (data.organization) {

          const organizationData = data.organization;
          this.organization = new Organization(organizationData);
          this.linkedin_uid = organizationData.linkedin_uid || "";
          this.organization_website_url = organizationData.website_url || "";
          this.organization_linkedin_url = organizationData.linkedin_url || "";
          this.organization_seo_description = organizationData.seo_description || "";
          this.organization_short_description = organizationData.short_description || "";
      } 
  }
  
  calculateDuration(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if(months < 0) {
        years--;
        months += 12;
    }
    const result = years.toString() + " years and " + months.toString() + " months";
    return result;
  }
}
// fetch data from Apollo api
async function getProfileData(message) {

  const email = message.body.email;
  const apolloKey = process.env.APOLLO_KEY;
  const sendData = {
      "api_key": apolloKey,
      "email": email,
      "reveal_personal_emails": true
  };
  const headers = {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
  };

  try {
      const response = await got.post(API_ENDPOINT, {
          headers: headers,
          responseType: 'json',
          json: sendData,
      });
      const userData = response?.body?.person;

      if (userData && userData.first_name !== "") {
          return new Profile(userData);
      } else {
          throw new Error("no match found");
      }
  } catch (error) {
      if (error.response && error.response.statusCode) {
          throw new Error(`${error.response.statusCode} Error`);
      } else {
          throw new Error("HTTP connection error");
      }
  }
}

class ExampleProcess extends Process {
  constructor() {
    super('ExampleProcess')
  }

  async run(message) {
    try {
        const user = await getProfileData(message)
        return success({ profile: user })
    } catch (error) {
        return failure(error.message);
    }
  }
}

export default ExampleProcess
