# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  describe ":index" do
    subject do
      get :index, params: params
    end

    let(:params) { {} }

    in_context :auth_guarded do
      it "is successful" do
        subject
        expect(response).to be_successful
      end

      context "with JSON format" do
        let(:params) { { format: "json" } }
        let!(:posts) { create_list(:post, Random.rand(2..4)) }

        it "is successful" do
          subject
          expect(response).to be_successful
        end

        it "returns all the posts" do
          subject
          expect(json_response[:posts].size).to eq(posts.size)
        end
      end
    end
  end

  define_context "invalid text" do
    context "with invalid text" do
      let(:text) { Faker::Lorem.characters(5) }

      it "returns an error" do
        subject
        expect(json_response[:errors].first).to match(/Text is too short/)
      end

      execute_tests
    end
  end

  describe ":create" do
    subject do
      post :create, params: params
    end

    let(:params) { { post: { text: text } } }
    let(:text) { Faker::StarWars.quote }

    in_context :auth_guarded do
      it "creates a new post" do
        expect{ subject }.to change(Post, :count).by(1)
        expect(Post.last.text).to eq(text)
      end

      it "returns the post" do
        subject
        post = Post.last
        expect(json_response[:post]).to eq("id" => post.id, "text" => post.text, "author" => { "id" => test_user.id, "username" => test_user.username })
      end

      in_context "invalid text" do
        it "doesn't create the post" do
          expect{ subject }.not_to change(Post, :count)
        end
      end
    end
  end

  define_context "not existing post" do
    context "when the post doesn't exist" do
      let(:id) { Faker::Lorem.characters(20) }

      it "returns an error" do
        subject
        expect(json_response[:errors]).not_to be_empty
      end
    end
  end

  define_context "not the author" do
    context "when the user isn't the author" do
      it "sends an error" do
        subject
        expect(json_response[:errors]).not_to be_empty
      end

      execute_tests
    end
  end

  define_context "is the author" do
    context "when the user is the author" do
      let!(:post) { create(:post, author: test_user) }

      execute_tests
    end
  end

  describe ":destroy" do
    subject do
      delete :destroy, params: { id: id }
    end

    let!(:post) { create(:post) }
    let(:id) { post.id }

    in_context :auth_guarded do
      in_context "not existing post"
      in_context "is the author" do
        it "destroys the post" do
          expect{ subject }.to change(Post, :count).by(-1)
        end

        it "returns the post" do
          subject
          expect(json_response[:post]).not_to be_nil
        end
      end

      in_context "not the author" do
        it "doesn't destroy the post" do
          expect{ subject }.not_to change(Post, :count)
        end
      end
    end
  end

  describe ":update" do
    subject do
      patch :update, params: { id: id, post: params }
    end

    let!(:post) { create(:post) }
    let(:id) { post.id }
    let(:text) { Faker::StarWars.quote }
    let(:params) { { text: text } }

    in_context :auth_guarded do
      in_context "not existing post"

      define_context :no_text_update do
        it "doesn't update the post" do
          expect{ subject }.not_to(change{ post.reload.text })
        end
      end

      in_context "is the author" do
        it "updates the post" do
          expect{ subject }.to change{ post.reload.text }.to(text)
        end

        it "returns the post" do
          subject
          expect(json_response[:post]).not_to be_nil
        end

        in_context "invalid text" do
          in_context :no_text_update
        end
      end

      in_context "not the author" do
        in_context :no_text_update
      end
    end
  end
end
