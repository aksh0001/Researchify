"""
This file contains the functions relating to getting publications from google scholar.
"""
from scholarly import scholarly
import json

def get_publications(author_id):
    """
    This function uses the scholarly library to retrieve publications associated with an author.
    :param author_id: google scholar user id extracted from their profile url
    :return: json string of publications in a list
    """
    search_query = scholarly.search_author_id(author_id)
    author_object = scholarly.fill(search_query, publication_limit=10)
    pub_list = []

    for pub in author_object["publications"]:
        current_pub = scholarly.fill(pub)
        del current_pub["source"]
        pub_list.append(current_pub)

    pub_json = json.dumps({ "publications": pub_list })
    return pub_json