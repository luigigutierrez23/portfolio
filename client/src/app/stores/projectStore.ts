import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Project } from "../models/projects";

import agent from "../api/agent";
import { store } from "./store";

export default class ProjectStore {
    projectRegistry = new Map<string, Project>();
    selectedProject: Project | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    predicate = new Map().set("all", true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.projectRegistry.clear();
                this.loadProjects();
            }
        );
    }

    get projectsByDate() {
        return Array.from(this.projectRegistry.values()).sort((a,b) => new Date(a.date).getDate() - new Date(b.date).getDate() );
    }

    // get axiosParams() {
    //   const params = new URLSearchParams();

    //   this.predicate.forEach((value, key) => {
    //     if (key === "startDate") {
    //       params.append(key, (value as Date).toISOString());
    //     } else {
    //       params.append(key, value);
    //     }
    //   });
    //   return params;
    // }

    // get postsByDate() {
    //   return Array.from(this.projectRegistry.values()).sort(
    //     (a, b) => a.date!.getTime() - b.date!.getTime()
    //   );
    // }

    // get groupedPosts() {
    //   return Object.entries(
    //     this.postsByDate.reduce((posts, post) => {
    //       const date = format(post.date!, "dd MMM yyyy");
    //       posts[date] = posts[date] ? [...posts[date], post] : [post];
    //       return posts;
    //     }, {} as { [key: string]: Post[] })
    //   );
    // }

    // Methods
    loadProjects = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Projects.list();
            result.forEach((project) => {
                this.setProject(project);
            });
            this.setLoadingInitial(false);
        } catch (err) {
            console.error(err);
            this.setLoadingInitial(false);
        }
    };

    loadProject = async (id: string) => {
        let project = this.getProject(id);

        if (project) {
            this.selectedProject = project;
            return project;
        } else {
            this.loadingInitial = true;
            try {
                project = await agent.Projects.details(id);
                this.setProject(project);
                runInAction(() => {
                    this.selectedProject = project;
                });
                this.setLoadingInitial(false);
                return project;
            } catch (err) {
                this.setLoadingInitial(false);
                console.error(err);
            }
        }
    };

    // createPost = async (post: PostFormValues) => {
    //   const user = store.userStore.user;
    //   const attendee = new Profile(user!);
    //   try {
    //     await agent.Posts.create(post);
    //     const newPost = new Post(post);
    //     newPost.hostUsername = user!.username;
    //     newPost.attendees = [attendee];
    //     this.setPost(newPost);
    //     runInAction(() => {
    //       this.selectedPost = newPost;
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // updatePost = async (post: PostFormValues) => {
    //   try {
    //     await agent.Posts.update(post);
    //     runInAction(() => {
    //       if (post.id) {
    //         let updatedPost = { ...this.getPost(post.id), ...post };
    //         this.projectRegistry.set(post.id, updatedPost as Post);
    //         this.selectedPost = updatedPost as Post;
    //       }
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // deletePost = async (id: string) => {
    //   this.loading = true;
    //   try {
    //     await agent.Posts.delete(id);
    //     runInAction(() => {
    //       this.projectRegistry.delete(id);
    //       this.loading = false;
    //     });
    //   } catch (err) {
    //     console.error(err);
    //     runInAction(() => {
    //       this.loading = false;
    //     });
    //   }
    // };

    // updateAttendance = async () => {
    //   const user = store.userStore.user;
    //   this.loading = true;
    //   try {
    //     await agent.Posts.attend(this.selectedPost!.id);
    //     runInAction(() => {
    //       if (this.selectedPost?.isGoing) {
    //         this.selectedPost.attendees = this.selectedPost.attendees?.filter(
    //           (a) => a.username !== user?.username
    //         );
    //         this.selectedPost.isGoing = false;
    //       } else {
    //         const attendee = new Profile(user!);
    //         this.selectedPost?.attendees?.push(attendee);
    //         this.selectedPost!.isGoing = true;
    //       }
    //       this.projectRegistry.set(this.selectedPost!.id, this.selectedPost!);
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     runInAction(() => {
    //       this.loading = false;
    //     });
    //   }
    // };

    // cancelPostToggle = async () => {
    //   this.loading = true;
    //   try {
    //     await agent.Posts.attend(this.selectedPost!.id);
    //     runInAction(() => {
    //       this.selectedPost!.isCancelled = !this.selectedPost?.isCancelled;
    //       this.projectRegistry.set(this.selectedPost!.id, this.selectedPost!);
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     runInAction(() => {
    //       this.loading = false;
    //     });
    //   }
    // };

    // updateAttendeeFollowing = (username: string) => {
    //   this.projectRegistry.forEach((post) => {
    //     post.attendees.forEach((attendee) => {
    //       if (attendee.username === username) {
    //         attendee.following
    //           ? attendee.followersCount--
    //           : attendee.followersCount++;
    //         attendee.following = !attendee.following;
    //       }
    //     });
    //   });
    // };

    // setPagination = (pagination: Pagination) => {
    //   this.pagination = pagination;
    // };

    // setPagingParams = (pagingParams: PagingParams) => {
    //   this.pagingParams = pagingParams;
    // };

    private setProject = (project: Project) => {
        this.projectRegistry.set(project.uid, project);
    };

    private getProject = (id: string) => {
        return this.projectRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    clearSelectedProject = () => {
        this.selectedProject = undefined;
    };
}