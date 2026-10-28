from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, jsonify, request

from agents import book_agent

chat_bp = Blueprint("chat", __name__)


def _parse_oid(value):
    try:
        return ObjectId(value)
    except (InvalidId, TypeError):
        return None


@chat_bp.route("/conversations", methods=["POST"])
def create_conversation_route():
    try:
        return jsonify({"conversation": book_agent.create_conversation()}), 201
    except Exception as e:
        return jsonify(
            {"error": "Could not create conversation", "detail": str(e)}
        ), 500


@chat_bp.route("/conversations/<conversation_id>", methods=["GET"])
def get_conversation_route(conversation_id):
    oid = _parse_oid(conversation_id)
    if oid is None:
        return jsonify({"error": "Invalid conversation ID"}), 400

    data = book_agent.get_conversation(oid)
    if data is None:
        return jsonify({"error": "Conversation not found"}), 404
    return jsonify(data), 200


@chat_bp.route("/conversations/<conversation_id>/messages", methods=["POST"])
def post_message_route(conversation_id):
    oid = _parse_oid(conversation_id)
    if oid is None:
        return jsonify({"error": "Invalid conversation ID"}), 400

    

 # Ensure that the conversation exists before calling the agent
    existing = book_agent.get_conversation(oid)
    if existing is None:
        return jsonify({"error": "Conversation not found"}), 404

    body = request.get_json(silent=True) or {}
    content = body.get("content") or body.get("message") or body.get("query")
    if not isinstance(content, str) or not content.strip():
        return jsonify({"error": "A non-empty message is required"}), 400

    try:
        result = book_agent.BookAgent(oid).answer(content.strip())
        return jsonify(
            {
                "message": {"role": "assistant", "content": result["answer"]},
                "sources": result["sources"],
            }
        ), 201
    except Exception as e:
        return jsonify(
            {"error": "The assistant could not answer", "detail": str(e)}
        ), 502