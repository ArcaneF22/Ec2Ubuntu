

export const TimeZoned = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const Fetch = {
                        users:              import.meta.env.VITE_GET_USERS,
                        myaccounts:         import.meta.env.VITE_GET_MYACCOUNTS,
                        accounts:           import.meta.env.VITE_GET_ACCOUNTS,
                        applications:       import.meta.env.VITE_GET_APPS,
                        myclubs:            import.meta.env.VITE_GET_MYCLUBS,
                        clubs:              import.meta.env.VITE_GET_CLUBS,
                        history:            import.meta.env.VITE_GET_HISTORY,
                        myhistory:          import.meta.env.VITE_GET_MYHISTORY,
                        notification:       import.meta.env.VITE_GET_NOTIFICATION,
                        notification_count: import.meta.env.VITE_GET_NOTIFICATION_COUNT,
                        authenticate:       import.meta.env.VITE_GET_AUTHENTICATE,
                        profile:            import.meta.env.VITE_GET_PROFILE,
                        images:             import.meta.env.VITE_GET_IMAGES,
                        unions:             import.meta.env.VITE_GET_UNIONS,
                        company:            import.meta.env.VITE_GET_COMPANY,
                        roles:              import.meta.env.VITE_GET_ROLES,
                        uplines:            import.meta.env.VITE_GET_UPLINES,
                    };

export const Upsert = {
                        users:              import.meta.env.VITE_UPSERT_USERS,
                        accounts:           import.meta.env.VITE_UPSERT_ACCOUNTS,
                        applications:       import.meta.env.VITE_UPSERT_APPS,
                        clubs:              import.meta.env.VITE_UPSERT_CLUBS,
                        unions:             import.meta.env.VITE_UPSERT_UNIONS,
                        uplines:            import.meta.env.VITE_UPSERT_UPLINES,
                    };

export const Path = {
                        icons:              "/images/icons/",
                        apps:               "/images/apps/",
                        clubs:              "/images/clubs/",
                        avatars:            "/images/avatars/",
                        logo:               "/images/logo/",
                        pictures:           "/images/pictures/"
                    };

export const unionType = [
                        {
                          key: 'PRIVATE',
                          text: 'PRIVATE',
                          value: 'PRIVATE',
                        },
                        {
                          key: 'PUBLIC',
                          text: 'PUBLIC',
                          value: 'PUBLIC',
                        },
                        {
                          key: 'UNION',
                          text: 'UNION',
                          value: 'UNION',
                        },
                      ]
